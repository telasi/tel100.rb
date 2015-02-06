# -*- encoding : utf-8 -*-
class Api::FolderController < ApiController
  before_filter :validate_login

  def index
    @folders = Folder::Base.where(owner_id: current_user.id)
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
end
