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
  
end