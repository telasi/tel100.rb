# -*- encoding : utf-8 -*-
class Tel100::HomeController < ApplicationController
  def index; @title = 'საწყისი' end

  def new
    @title = 'ახალი დოკუმენტი'
    if request.post?
      @document = Document::Base.new(params.require(:document_base).permit(:subject, :body))
    else
      r1 = Sys::User.find_by_username('ekash').employee
      r2 = Sys::User.find_by_username('makame').employee
      @motions = [
        Document::Motion.new(receiver: r1, motion_text: 'motion 1'),
        Document::Motion.new(receiver: r2, motion_text: 'motion 2'),
      ]
      @document = Document::Base.new(subject: 'subject', body: 'test', motions: @motions)
    end
  end
end
