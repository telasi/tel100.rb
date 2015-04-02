# -*- encoding : utf-8 -*-
class Api::BsController < ApiController
  before_filter :validate_login

  def list
    @customers = BS::Customer.all
    @customers = @customers.where("name LIKE N?", '%' + params['name'] +'%') if params['name'].present?
    @customers = @customers.where("address LIKE N?", '%' + params['address'] +'%') if params['address'].present?
    @customers = @customers.where("taxid" => params['taxid']) if params['taxid'].present?
    @customers = @customers.where("accnumb" => params['accnumb']) if params['accnumb'].present?
    @total = @customers.count
    @customers = @customers.offset(params["start"]) if params["start"]
    @customers = @customers.limit(params["limit"]) if params["limit"]
  end
end
