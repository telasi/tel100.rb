# -*- encoding : utf-8 -*-
class Api::PartyController < ApiController
  def list
    @party = HR::Party.all
    @party = @party.where("name_ka LIKE N:p_name or name_en LIKE N:p_name or name_en LIKE N:p_name", { p_name: '%' + params['name'] +'%'}) if params['name'].present?
    @party = @party.where("address_ka LIKE N:p_address or address_ru LIKE N:p_address or address_en LIKE N:p_address", { p_address: '%' + params['address'] +'%'}) if params['address'].present?
    @party = @party.where("contact_ka LIKE N:p_contact or contact_ru LIKE N:p_contact or contact_en LIKE N:p_contact", { p_contact: '%' + params['contact'] +'%'}) if params['address'].present?
    @party = @party.where("identity" => params['identity']) if params['identity'].present?
    @total = @party.count
    @party = @party.offset(params["start"]) if params["start"]
    @party = @party.limit(params["limit"]) if params["limit"]
  end

  def create
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

  def favourites
    @favourites = Party::Favourites.where(user: current_user)
    @favourites = @favourites.where.not(person_type: 'HR::Employee') if params['hideHR'].present? and params['hideHR'] == "true"
    @favourites = @favourites.where.not(person_type: 'HR::Party') if params['hideParty'].present? and params['hideParty'] == "true"
    @favourites = @favourites.where.not(person_type: 'BS::Customer') if params['hideCustomers'].present? and params['hideCustomers'] == "true"
  end

  def favourites_create
    @favourites = Party::Favourites.new(params.permit(:person_id, :person_type))
    @favourites.user_id = current_user.id
    if @favourites.save
     render json: { success: true }
    else
     render json: { success: false, message: @favourites.errors.full_messages[0] }
    end
  end

  def favourites_delete
    Party::Favourites.find(params[:id]).delete
    render json: { success: true }
  end

  def info
    object = params[:class_name].constantize.find(params[:id])
    if object.respond_to?(:to_html)
      render json: { success: true, html: object.to_html }
    else
      render json: { success: true, message: object.to_s }
    end
  end
end
