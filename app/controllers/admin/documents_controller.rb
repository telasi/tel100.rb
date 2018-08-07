# -*- encoding : utf-8 -*-
class Admin::DocumentsController < AdminController
  def index
    @title = 'დოკუმენტების მართვა'
    if params[:docnumber].present?
      @document = Document::Base.where(docnumber: params[:docnumber], docyear: params[:docyear]).first
    end
  end

  def replace
    Document::File.replace(params)
    redirect_to admin_documents_url
  end

  def upload
  	render json: { success: Document::File.upload(params) }
  end

  def destroy
    file = Document::File.find(params[:id])
    file.delete_file
    file.destroy
    render json: { success: true }
  end

  def bodytext
    text = Document::Text.where(document_id: params[:id]).first
    text.body = params[:bodytext]
    text.save
    redirect_to admin_documents_url
  end

  def general
    doc = Document::Base.find(params[:id])
    doc.send("#{params[:field]}=", params[:value])
    doc.save!
    render json: { success: true }
  end

  def motion
    motion = Document::Motion.find(params[:motionId])
    case params[:field]
      when 'ordering'
        motion.ordering = params[:value]
        motion.save!
      when 'status'
        motion.status = params[:value]
        motion.save!
      when 'role'
        motion.receiver_role = params[:value]
        motion.save!
      when 'responsetype'
        motion.resp_type_id = params[:value]
        motion.save!
      when 'responsetext'
        motion.response_text = params[:value]
        motion.save!
      when 'motiontext'
        motion.motion_text = params[:value]
        motion.save!
      when 'receiver'
        motion_params = { receiver_id: params[:value], receiver_type: params[:partyType] }
        receiver_user, receiver = Document::Motion.who_eval('receiver', motion_params)
        motion.receiver_user = receiver_user
        motion.receiver = receiver
        motion.save!
    end
    render json: { success: true }
  end

  def hr
    case params[:partyType]
      when 'HR::Employee'
        hrs = HR::Employee.active.where('first_name_ka like :name OR first_name_ru like :name OR last_name_ka like :name OR last_name_ru like :name', name: "%#{params[:searchString].strip}%")
        hash = hrs.map{ |hr| { id: hr.id, name: "#{hr.to_s}:#{hr.organization.to_s}"} }
      when 'HR::Party'
        hrs = HR::Party.where('name_ka LIKE :name OR name_ru LIKE :name OR name_en LIKE :name or customer like :name', name: "%#{params[:searchString].strip}%")
        hash = hrs.map{ |hr| {id: hr.id, name: "#{hr.to_s}:#{hr.customer}"} }
      when 'BS::Customer'
        hrs = BS::Customer.where("name LIKE N\'%#{params[:searchString].strip}%\' or accnumb like \'%#{params[:searchString].strip}%\'")
        hash = hrs.map{ |hr| {id: hr.id, name: "#{hr.to_s}:#{hr.accnumb}"} }
    end
    render json: ( hash )
  end

  def gnerc_stage_1
  end

  def gnerc_stage_2
  end

  def hr_hash(hrs)
    hrs.map do |hr|
      {
        id: hr.id,
        name: hr.to_s
      }
    end
  end
end
