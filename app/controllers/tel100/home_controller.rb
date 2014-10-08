# -*- encoding : utf-8 -*-
class Tel100::HomeController < ApplicationController
  def index
    @title = 'გაგზავნილი'
    # @motions = Document::Motion.paginate(per_page: 10, page: params[:page])
    @documents = Document::Base.joins('INNER JOIN documents_motion ON documents_motion.document_id=documents.id').paginate(per_page: 20, page: params[:page])
  end

  def new
    @title = 'ახალი დოკუმენტი'
    if request.post?
      @document = Document::Base.new_document(current_user, params[:document_base])
      # in case of exception use params[:document_base] as param
    else
      @document = Document::Base.new
    end
  end
end
