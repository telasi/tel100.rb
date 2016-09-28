# -*- encoding : utf-8 -*-
module Party::Partifier
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def partify(field)
      
      belongs_to "#{field}_user".to_sym, class_name: 'Sys::User', foreign_key: "#{field}_user_id"
      belongs_to field.to_sym, polymorphic: true

      self.send(:define_method, "#{field}_ext_name") do
        obj = self.send("#{field}".to_sym)
        if obj.present?
          if obj.is_a?(HR::Employee) then obj.full_name
          elsif obj.is_a?(HR::Organization) then obj.name
          else obj.to_s end
        else
          user = self.send("#{field}_user".to_sym)
          user.full_name if user
        end
      end

      self.send(:define_method, "#{field}_ext_icon") do
        obj = self.send("#{field}".to_sym)
        if obj.present?
          obj.icon if obj.respond_to?(:icon)
        else
          user = self.send("#{field}_user".to_sym)
          'user' if user
        end
      end
    end
  end
end
