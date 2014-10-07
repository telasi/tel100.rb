# -*- encoding : utf-8 -*-
class Tel100::HomeController < ApplicationController
  def index; @title = 'საწყისი' end

  def new
    @title = 'ახალი დოკუმენტი'
    @document = Document::Base.new(subject: 'სატესტო დავალება',  body: '<p>გთხოვთ გამიშვათ შვებულებაში!</p>')
  end
end
