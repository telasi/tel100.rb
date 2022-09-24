# -*- encoding : utf-8 -*-
class Api::Documents::GnercController < ApiController
  before_filter :validate_login, except: 'download'

  def index
    @gnerc = Document::Gnerc.where(document_id: params[:document_id]).first
  end

  def upload
    render json: { success: Document::Gnerc.upload(params) }
  end

  def download
    gnerc = Document::Gnerc.find(params[:id])
    send_file gnerc.full_path, filename: gnerc.original_name, disposition: 'inline'
  end

  def file_delete
    doc = Document::Base.find(params[:id])
    gnerc = Document::Gnerc.where(document: doc).first
    return unless gnerc
    gnerc.file.delete_file
    gnerc.file.destroy
    gnerc.file = nil
    gnerc.save!
    render json: { success: true }
  end

  def update
    doc = Document::Base.find(params[:id])
    if can_edit_document?(doc)
      Document::Gnerc.update_gnerc(params)
      render json: { success: true }
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  def add_customer
    doc = Document::Base.find(params[:id])
    if can_edit_document?(doc)
      Document::Gnerc.add_customer(params)
      render json: { success: true }
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  def send_gnerc
    doc = Document::Base.find(params[:id])
    Gnerc::Sender.answer(doc)
    Gnerc::SenderOld.answer(doc)
    render json: { success: true }
  end

  def reset_sms
    doc = Document::Base.find(params[:document_id])
    Document::Sms.reset_sms!(doc, params[:status], effective_user)
    render json: { success: true }
  end

  def update_sms
    sms = Document::Sms.find(params[:id])
    sms.update_attributes(params.permit(:active, :text).merge({user: effective_user}))
    sms.save!
    render json: { success: true }
  end

  def send_sms
    doc = Document::Base.find(params[:id])
    if can_edit_document?(doc)
      Document::Gnerc.send_sms(params)
      render json: { success: true }
    else
      render json: { success: false, error: MSG_CANNOT_EDIT }
    end
  end

  def sms
    doc = Document::Base.find(params[:document_id])
    @smses = Document::Sms.where('base_id = :id or answer_id = :id', id: doc.id).order(:created_at)
  end

  def smses
    @smses = Document::Sms.get_smsmes(params[:id])
  end

  def gas_providers
    render json: Gnerc::GasProviders.all.to_json
  end
  
end
