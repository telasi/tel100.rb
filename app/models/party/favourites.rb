# -*- encoding : utf-8 -*-
class Party::Favourites < ActiveRecord::Base
  include Party::Convert

  self.table_name  = 'party_favourites'
  self.sequence_name = 'partyfav_seq'

  belongs_to :user, class_name: 'Document::User', foreign_key: 'user_id'
  
  validate :already_exists
  before_save :on_before_save

  def name
  	obj = self.person_type.constantize.find(self.person_id)
    if obj.is_a?(HR::Employee) then obj.full_name
    elsif obj.is_a?(HR::Organization) then obj.name
    else obj.to_s end
  end

  private

  def already_exists
  	errors.add(:person_id, 'Already exists') if Party::Favourites.where(user_id: self.user_id, person_id: self.person_id, person_type: convert(self.person_type)).first
  end

  def convert(type)
	type = 'HR::Employee' if type == 'hr.Employee'
    type = 'HR::Organization' if type == 'hr.Organization'
    type = 'HR::Party' if type == 'hr.Party'
    type = 'BS::Customer' if type == 'bs.Customer'
    type
  end

  def on_before_save
  	self.person_type = convert(self.person_type)
    #self.person_type = class_convert(self.person_type)
  end
end
