# -*- encoding : utf-8 -*-
module Localized
  def localized_field(*fields)
    fields.each do |field|
      # getter
      define_method("#{field}") do
        self.send("#{field}_#{I18n.locale}")
      end
      # setter
      define_method("#{field}=") do |value|
        self.send("#{field}_#{I18n.locale}=", value)
      end
    end
  end

  alias localized_fields localized_field
end

ActiveRecord::Base.extend Localized