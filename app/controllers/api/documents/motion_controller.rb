# -*- encoding : utf-8 -*-
class Api::Documents::MotionController < ApiController
  include Document::Status
  include Document::Role
  include TreeUtils
  before_filter :validate_login

  def index
    @document = Document::Base.find(params[:document_id])
    rel = @document.motions.where('receiver_role not in (?)', ROLE_SENDER)

    if params[:mode] == 'out'
      rel = rel.where(sender_user: current_user)
      rel = rel.where(parent_id: (params[:parent_id].present? ? params[:parent_id] : nil))
    else
      if current_user == @document.sender_user
        hasbase = true
      else
        is_author = @document.author?(current_user)
      end
      rel = rel.where(receiver_user: current_user)
      rel = rel.where('status NOT IN (?)', [ DRAFT, NOT_SENT, NOT_RECEIVED ])
    end

    rel = rel.where(receiver_role: params[:role]) if params[:role].present?

    motions = rel.order('ordering ASC, id ASC').to_a
    if hasbase
      @motions = [ nil ] + motions
    elsif is_author
      @motions = motions + [ nil ]
    else
      @motions = motions
    end
  end

  def show
    @motion = Document::Motion.find(params[:id])
  end

  def tree
    document = Document::Base.find(params[:document_id])
    motionsArray = document.motions.where('status NOT IN (?) AND receiver_role NOT IN (?)', [ DRAFT ], [ ROLE_SENDER ]).order('ordering ASC, id ASC').map do |motion|
      motion_data(motion)
    end
    render json: array_to_tree(motionsArray)
  end

  def signatures
    doc  = Document::Base.find(params[:document_id])
    @motions = doc.motions.where('receiver_role IN (?) and status IN (?)', [ROLE_SIGNEE, ROLE_AUTHOR], [CURRENT, COMPLETED, CANCELED, SENT, NOT_RECEIVED]).order('id')
  end

  def assignees
    doc  = Document::Base.find(params[:document_id])
    motions = doc.motions.where('receiver_role IN (?) and status IN (?) and sender_user_id=?', [ROLE_ASSIGNEE], [CURRENT, COMPLETED, CANCELED, SENT, NOT_RECEIVED], current_user.id).order('id')
    render json: (motions.map do |motion|
          motion_data(motion)
        end)
  end

  def assignees_out
    doc = Document::Base.find(params[:document_id])
    @motions = doc.motions.where('receiver_role IN (?) and sender_user_id=?', [ROLE_ASSIGNEE], current_user.id).order('ordering, id')
    render action: 'index'
  end

  def create_draft
    doc = Document::Base.find(params[:document_id])
    if can_edit_document?(doc)
      @motion = Document::Motion.create_draft!(effective_user, params)
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  def update_draft
    motion = Document::Motion.find(params[:id])
    if can_edit_document?(motion.document)
      motion.update_draft!(effective_user, params)
      render json: { success: true }
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  def delete_draft
    motion = Document::Motion.find(params[:id])
    if can_edit_document?(motion.document)
      motion.delete_draft!(effective_user)
      render json: { success: true }
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  def send_draft_motions
    doc = Document::Base.find(params[:document_id])
    if can_edit_document?(doc)
      motions = doc.motions.where(status: DRAFT, sender_user_id: current_user.id)
      Document::Motion.transaction do
        motions.each do |motion|
          motion.send_draft! effective_user
        end
      end
      render json: { success: true }
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  private

  def motion_data(motion)
    { id: motion.id,
      type: 'motion',
      parent_id: motion.parent_id,
      status: motion.status,
      is_new: motion.new?,
      current_status: motion.current_status.to_s,
      ordering: motion.ordering,
      sender: motion.sender_name,
      received_at: (motion.received_at.localtime.strftime('%d-%b-%Y %H:%M') if motion.received_at.present?),
      receiver_role: motion.receiver_role,
      receiver: motion.receiver_name,
      send_type: motion.send_type.to_s,
      completed_at: (motion.completed_at.localtime.strftime('%d-%b-%Y %H:%M') if motion.completed_at.present?),
      response_type: motion.response_type.to_s,
      due_date: motion.effective_due_date,
      due_is_over: motion.due_is_over?,
      receiver_id: motion.receiver_id,
      receiver_type: motion.receiver_type }
  end
end
