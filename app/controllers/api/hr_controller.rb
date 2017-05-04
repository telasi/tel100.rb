# -*- encoding : utf-8 -*-
class Api::HrController < ApiController
  include TreeUtils
  before_filter :validate_login

  def structure
    render json: get_tree
  end

  def partylist
    @party = HR::Party.all
    @party = @party.where(id: params['id']) if params['id'].present?
    @party = @party.where("lower(name_ka) LIKE N:p_name or lower(name_ru) LIKE N:p_name or lower(name_en) LIKE N:p_name", { p_name: '%' + params['name'].mb_chars.downcase.to_s + '%' }) if params['name'].present?
    @party = @party.where("lower(address_ka) LIKE N:p_address or lower(address_ru) LIKE N:p_address or lower(address_en) LIKE N:p_address", { p_address: '%' + params['address'].mb_chars.downcase.to_s + '%' }) if params['address'].present?
    @party = @party.where("lower(contact_ka) LIKE N:p_contact or lower(contact_ru) LIKE N:p_contact or lower(contact_en) LIKE N:p_contact", { p_contact: '%' + params['contact'].mb_chars.downcase.to_s + '%' }) if params['address'].present?
    @party = @party.where("identity" => params['identity']) if params['identity'].present?
    @party = @party.where("customer" => params['customer']) if params['customer'].present?
    #@party = @party.where("phones LIKE N?", '%' + params['phones'] +'%') if params['phones'].present?
    #@party = @party.where("accnumb" => params['accnumb']) if params['accnumb'].present?
    @total = @party.count
    @party = @party.offset(params["start"]) if params["start"]
    @party = @party.limit(params["limit"]) if params["limit"]
  end

  def partycreate
    @party = HR::Party.new(params.permit(:name_ka, :address_ka, :contact_ka, 
                                         :name_ru, :address_ru, :contact_ru, 
                                         :name_en, :address_en, :contact_en, 
                                         :identity, :phones, :email, :customer))
    @party.org_type = 1
    @party.customer = @party.customer.squish
    if @party.save
     render json: { success: true, id: @party.id }
    else
     render json: { success: false, message: @party.errors.full_messages[0] }
    end
  end

  def party_get
    @party = HR::Party.where(id: params[:id])
  end

  def party_update
    @party = HR::Party.find(params[:id])
    if @party.update_attributes!(params.permit(:name_ka, :address_ka, :contact_ka, :name_ru, :address_ru, :contact_ru, :name_en, :address_en, :contact_en,
                                               :identity, :phones, :email, :customer))
      render json: { success: true, id: @party.id }
    else
      render json: { success: false, message: @party.errors.full_messages[0] }
    end
  end

  private

  def build_tree
    employees = HR::Employee.active.group_by{ |node| node['organization_id'] }
    vacations = HR::Vacation::Base.confirmed.current.index_by{ |node| node['employee_id']}
    structureArray = HR::Organization.active.order(saporg_type: :desc).order(is_manager: :desc, priority: :asc).map do |org|
      if org.saporg_type == 'S'
        empl = employees[org.id]
        empl.map do | e |
          obj = e.to_hash(organization: org) 
          #add vacation fields
          vac = vacations[e.id]
          obj.merge!(vac.to_hash) if vac
          obj
        end if empl
      else
        org.to_hash
      end
    end.flatten.select{ |x| x.present? }
    array_to_tree(structureArray)
  end

  def get_tree
    if $hrstruct_cachedate != Date.today or $hrstruct_cache.blank? or $hrstruct_cache[I18n.locale.to_s].blank?
      $hrstruct_cache ||= {}
      $hrstruct_cache[I18n.locale.to_s] = build_tree
      $hrstruct_cachedate = Date.today
    end
    $hrstruct_cache[I18n.locale.to_s]
  end
end
