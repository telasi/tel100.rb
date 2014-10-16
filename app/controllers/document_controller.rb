# -*- encoding : utf-8 -*-
class DocumentController < ApplicationController

	def index
		render json: Document::Base.all.to_json(:include => { :author_user => { :only => [:first_name_ka, :last_name_ka,
																						  :first_name_ru, :last_name_ru,
																						  :first_name_en, :last_name_en
																						 ]}})
	end
end