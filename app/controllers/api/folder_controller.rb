# -*- encoding : utf-8 -*-
class Api::FolderController < ApiController
  before_filter :validate_login

  def index
    @folders = Folder::Base.where(owner_id: current_user.id).order('ORDER_BY')
  end

  def create
    @folder = Folder::Base.new(params.permit(:name))
    @folder.owner_id = current_user.id
    @folder.folder_type = 0
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
    Folder::Base.destroy(params[:id])
  end

  def document_index
  end

  def document_create
    Folder::Document.new(params.permit(:folder_id, :doc_id)).save
  end

  def document_delete
  end
end
