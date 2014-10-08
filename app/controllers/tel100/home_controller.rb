# -*- encoding : utf-8 -*-
class Tel100::HomeController < ApplicationController
  def index; @title = 'საწყისი' end

  def new
    @title = 'ახალი დოკუმენტი'
    if request.post?
      @document = Document::Base.new(params.require(:document_base).permit(:subject, :body,
        motions_attributes: [:id, :receiver_id, :motion_text]))
      @document.motions.each { |m| m.receiver_type = 'HR::Employee' }
      @document.docdate = Date.today
      @document.docyear = Date.today.year
      @document.save
      # TODO:

    else
      @document = Document::Base.new
      @document.motions.build
    end
  end
end
