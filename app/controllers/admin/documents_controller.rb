# -*- encoding : utf-8 -*-
class Admin::DocumentsController < AdminController
  def index
    @title = 'დოკუმენტების მართვა'
    if params[:docnumber].present?
      @document = Document::Base.find_by_docnumber(params[:docnumber])
      
    end
  end
end
