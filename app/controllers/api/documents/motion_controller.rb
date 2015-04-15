# -*- encoding : utf-8 -*-
class Api::Documents::MotionController < ApiController
  include Document::Status
  include Document::Role
  include TreeUtils
  before_filter :validate_login

  def index
    @document = Document::Base.find(params[:document_id])
    rel = @document.motions

    if params[:mode] == 'out'
      rel = rel.where(sender_user: current_user)
      rel = rel.where(parent_id: (params[:parent_id].present? ? params[:parent_id] : nil))
    else
      hasbase = true if current_user == @document.sender_user
      rel = rel.where(receiver_user: current_user)
      rel = rel.where('status NOT IN (?)', [ DRAFT, NOT_SENT, NOT_RECEIVED ])
    end

    rel = rel.where(receiver_role: params[:role]) if params[:role].present?

    motions = rel.order('ordering ASC, id ASC').to_a
    @motions = hasbase ? [ nil ] + motions : motions
  end

  def show
    @motion = Document::Motion.find(params[:id])
  end

  def tree
    document = Document::Base.find(params[:document_id])
    motionsArray = document.motions.where('status NOT IN (?)', [ DRAFT ]).order('ordering ASC, id ASC').map do |motion|
      { id: motion.id,
        type: 'motion',
        parent_id: motion.parent_id,
        status: motion.status,
        current_status: motion.current_status.to_s,
        ordering: motion.ordering,
        sender: motion.sender_name,
        receiver: motion.receiver_name
      }
    end
    render json: array_to_tree(motionsArray)
  end

  def signatures
    doc  = Document::Base.find(params[:document_id])
    @motions = doc.motions.where('receiver_role IN (?) and status IN (?)', [ROLE_SIGNEE, ROLE_AUTHOR], [CURRENT, COMPLETED, CANCELED, SENT, NOT_RECEIVED]).order('id')
  end

  def assignees
    doc  = Document::Base.find(params[:document_id])
    @motions = doc.motions.where('receiver_role IN (?) and status IN (?)', [ROLE_ASSIGNEE], [CURRENT, COMPLETED, CANCELED, SENT, NOT_RECEIVED]).order('id')
  end

  def create_draft
    @motion = Document::Motion.create_draft!(current_user, params)
  end

  def update_draft
    motion = Document::Motion.find(params[:id])
    motion.update_draft!(current_user, params)
    render json: { success: true }
  end

  def delete_draft
    motion = Document::Motion.find(params[:id])
    motion.delete_draft!(current_user)
    render json: { success: true }
  end

  def send_draft_motions
    doc = Document::Base.find(params[:document_id])
    parent_motion = Document::Motion.find(params[:parent_id]) if params[:parent_id].present?
    if parent_motion.present?
      parent_motion.send_draft_motions!(current_user)
    else
      doc.send_draft_motions!(current_user)
    end
    render json: { success: true }
  end
end
