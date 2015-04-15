# -*- encoding : utf-8 -*-
module Party::Convert
  def self.included(base)
    base.extend(ClassMethods)
  end
  
  module ClassMethods
    def class_convert(type)
      'HR::Employee' if type == 'hr.Employee'
      'HR::Organization' if type == 'hr.Organization'
      'HR::Party' if type == 'hr.Party'
      'BS::Customer' if type == 'bs.Customer'
    end
  end
end
