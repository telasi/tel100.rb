# -*- encoding : utf-8 -*-
class Tel100::HomeController < ApplicationController
  def index; @title = 'საწყისი' end

  def new
    @title = 'ახალი დოკუმენტი'
    @document = Document::Base.new
  end
end
