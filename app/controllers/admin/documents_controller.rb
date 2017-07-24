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
end
