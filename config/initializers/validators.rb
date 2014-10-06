# -*- encoding : utf-8 -*-
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.present? and not value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors[attribute] << (options[:message] || "illegal email address")
    end
  end
end

class MobileValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.present? and not KA.correct_mobile?(value.to_s)
      record.errors[attribute] << (options[:message] || "illegal mobile number")
    end
  end
end

class UsernameValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.present? and not value =~ /[a-z][a-z0-9_]{3,}/i
      record.errors[attribute] << (options[:message] || "illegal username")
    end
  end
end
