# -*- encoding : utf-8 -*-
class Api::HrController < ApiController
  include TreeUtils
  before_filter :validate_login

  def structure
    employees = HR::Employee.active.index_by{ |node| node['organization_id'] }
    structureArray = HR::Organization.active.order(saporg_type: :desc).order(is_manager: :desc, priority: :asc).map do |org|
      if org.saporg_type == 'S'
        empl = employees[org.id]
        empl.to_hash(organization: org) if empl
      else
        org.to_hash
      end
    end.select{ |x| x.present? }
    render json: array_to_tree(structureArray)
  end

  def partylist
    @party = HR::Party.all
    @party = @party.where("name_ka LIKE N:p_name or name_en LIKE N:p_name or name_en LIKE N:p_name", { p_name: '%' + params['name'] +'%'}) if params['name'].present?
    @party = @party.where("address_ka LIKE N:p_address or address_ru LIKE N:p_address or address_en LIKE N:p_address", { p_address: '%' + params['address'] +'%'}) if params['address'].present?
      @party = @party.where("contact_ka LIKE N:p_contact or contact_ru LIKE N:p_contact or contact_en LIKE N:p_contact", { p_contact: '%' + params['contact'] +'%'}) if params['address'].present?
    @party = @party.where("identity" => params['identity']) if params['identity'].present?
    #@party = @party.where("phones LIKE N?", '%' + params['phones'] +'%') if params['phones'].present?
    #@party = @party.where("accnumb" => params['accnumb']) if params['accnumb'].present?
    @total = @party.count / params["limit"].to_i if params["limit"]
    @party = @party.offset(params["start"]) if params["start"]
    @party = @party.limit(params["limit"]) if params["limit"]
  end

  def partycreate
    @party = HR::Party.new(params.permit(:name_ka, :address_ka, :contact_ka, 
                                         :name_ru, :address_ru, :contact_ru, 
                                         :name_en, :address_en, :contact_en, 
                                         :identity, :phones, :email))
    @party.org_type = 1
    if @party.save
     render json: { success: true }
    else
     render json: { success: false, message: @party.errors.full_messages[0] }
    end
  end
end
