# -*- encoding : utf-8 -*-
class HR::Party < ActiveRecord::Base
  self.table_name  = 'party_base'
  self.sequence_name = 'party_base_seq'
  self.localized_fields('name', 'address', 'contact')
  validate :name_entered, :customer_exist
  before_save :trim_phones

  def to_s; self.name end

  def to_html
    id = self.identity
    name = self.name
    address = self.address
    phones = self.phones
    email = self.email
    text = ''
    text = "<code>#{id}</code>" if id.present?
    text = "#{text} #{name}" if name.present?
    text = "#{text} &mdash; <span class=\"text-muted\">#{address}</span>"
    if email.present?
      emails_text = email.split(' ').map{|x| "<a href=\"mailto:#{x}\">#{x}</a>"}
      text = "#{text}<br>#{emails_text.join('; ')}"
    end
    if phones.present?
      phones_text = phones.split(' ').map{|x| "<code><i class=\"fa fa-phone\"></i> #{x}</code>"}
      text = "#{text}<br>#{phones_text.join('; ')}"
    end
    text
  end

  def self.compact_mobile(mob)
     mob.scan(/[0-9]/).join('') if mob
  end

  def self.correct_mobile?(mob)
    not not (compact_mobile(mob) =~ /^[0-9]{9}$/)
  end

  protected

  def name_entered
  	errors.add('Name must be entered') if (self.name_ka.nil? and self.name_ru.nil? and self.name_en.nil?)
  end

  def customer_exist
    if self.customer.strip.length > 0
      errors.add('Customer not found') unless BS::Customer.where(accnumb: self.customer).any?
    end
  end

  def trim_phones
    self.phones.delete!(' ')
  end
end
