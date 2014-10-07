# -*- encoding : utf-8 -*-
class Tel100::HomeController < ApplicationController
  def index; @title = 'საწყისი' end

  def new
    @title = 'ახალი დოკუმენტი'
    if request.post?
      @document = Document::Base.new(params.require(:document_base).permit(:subject, :body))
    else
      @document = Document::Base.new
    end
  end
end
