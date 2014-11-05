# -*- encoding : utf-8 -*-
module Document::Personalize
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def personalize(field)
      belongs_to "#{field}_user".to_sym, class_name: 'Sys::User'
      belongs_to field.to_sym, polymorphic: true
    end
  end
end
