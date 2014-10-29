# -*- encoding : utf-8 -*-
class Api::Docs::DocumentsController < ApiController

	def index
		documents = Document::Base
		filter = params[:filter]
		if filter
		  filter = JSON.parse(filter)
		  filter = filter.index_by{|node| node["property"]}

    	  documents = documents.where(id: filter['id']['value']) if filter['id'].present?
		  documents = documents.where("docdate >= ?", Date.strptime(filter['from_docdate']['value'])) if filter['from_docdate'].present?
		  documents = documents.where("docdate <= ?", Date.strptime(filter['to_docdate']['value'])) if filter['to_docdate'].present?
		  documents = documents.where(type_id: filter['typeId']['value']) if filter['typeId'].present?
		  documents = documents.where(docnumber: filter['docnumber']['value']) if filter['docnumber'].present?
		  documents = documents.where("subject LIKE ?", filter['subject']['value']+'%') if filter['subject'].present?
		  documents = documents.where("dueDate => ?", Date.strptime(filter['from_dueDate']['value'])) if filter['from_dueDate'].present?
		  documents = documents.where("dueDate <= ?", Date.strptime(filter['to_dueDate']['value'])) if filter['to_dueDate'].present?
		end

		render json: documents.all.to_json(:include => [{ :author_user => { :only => [:first_name_ka, :last_name_ka,
																						  :first_name_ru, :last_name_ru,
																						  :first_name_en, :last_name_en
																			  ]}},
															 { :sender_user => { :only => [:first_name_ka, :last_name_ka,
																						  :first_name_ru, :last_name_ru,
																						  :first_name_en, :last_name_en
																			  ]}},
														:text])
	end
end
