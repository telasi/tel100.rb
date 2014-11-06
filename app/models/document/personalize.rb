# -*- encoding : utf-8 -*-
module Document::Personalize
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def personalize(field)
      belongs_to "#{field}_user".to_sym, class_name: 'Sys::User'
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

      self.send(:define_method, "#{field}_ext_id") do
        obj = self.send("#{field}".to_sym)
        if obj.present?
          if obj.is_a?(HR::Employee) then "P#{obj.id}"
          elsif obj.is_a?(HR::Organization) then obj.id
          else obj.to_s end
        else
          user = self.send("#{field}_user".to_sym)
          "U#{user.id}" if user
        end
      end

      self.send(:define_method, "#{field}_ext_icon") do
        obj = self.send("#{field}".to_sym)
        if obj.present?
          if obj.is_a?(HR::Employee) then obj.icon
          elsif obj.is_a?(HR::Organization) then 'bank'
          else obj.to_s end
        else
          user = self.send("#{field}_user".to_sym)
          'user' if user
        end
      end
    end
  end
end
