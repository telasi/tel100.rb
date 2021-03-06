# -*- encoding : utf-8 -*-
class Api::FolderController < ApiController
  include TreeUtils
  before_filter :validate_login

  def index
    @folders = Folder::Base.where(owner_id: effective_user.id).order('ORDER_BY').map do |folder|
      folder.to_hash(effective_user)
    end
  end

  def standard
    @folders = Folders::STANDARD.map do |folder|
      folder.to_hash(effective_user)
    end
  end

  def create
    @folder = Folder::Base.new(params.permit(:name, :folder_type, :form))
    @folder.owner_id = current_user.id
    if @folder.save
     render json: { success: true }
    else
     render json: { success: false, message: @folder.errors.full_messages[0] }
    end
  end

  def order
    parsed = JSON.parse(param.permit(:list))
    parsed.each do |folder|
      @folder = Folder::Base.where(id: folder.id).first
      if @folder

      end
    end
  end

  def delete
    folder = Folder::Base.find(params[:id])
    folder.delete_folder
    render json: { success: true }
  end

  def document_index
  end

  def document_create
    Folder::Document.new(params.permit(:folder_id, :doc_id)).save
    render json: { success: true }
  end

  def document_delete
    doc = Folder::Document.where(folder_id: params[:folder_id], doc_id: params[:doc_id]).first
    doc.destroy if doc
    render json: { success: true }
  end
end
