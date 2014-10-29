# -*- encoding : utf-8 -*-
class Api::Docs::MotionsController < ApiController
  include Utils

  def index
 	render json: {
		success: true,
		motions: array_to_tree(Document::Motion.where(document_id: params[:id]).as_json)
 	}
  end
end