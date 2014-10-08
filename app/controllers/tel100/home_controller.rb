# -*- encoding : utf-8 -*-
class Tel100::HomeController < ApplicationController
  def index; @title = 'საწყისი' end

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
