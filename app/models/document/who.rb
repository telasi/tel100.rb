# -*- encoding : utf-8 -*-
module Document::Who
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def who_eval(whom, opts)

      id = opts[ "#{whom.to_s}_id".to_sym ]

      # getting type
      type = opts[ "#{whom.to_s}_type".to_sym ]
      type = 'HR::Employee' if type == 'hr.Employee'
      type = 'HR::Organization' if type == 'hr.Organization'
      type = 'HR::Party' if type == 'hr.Party'
      type = 'BS::Customer' if type == 'bs.Customer'

      # neither id not type are defined
      return [ nil, nil ] if ( id.blank? or type.blank? )

      # find person & related user
      who = user = nil
      if type == 'Sys::User'
        user = Sys::User.find(id)
        who = whose_user( user )
      else
        who = type.constantize.find(id)
        if who.instance_of?(HR::Employee)
          unless who.active?
            active_who = HR::Employee.where(person_id: who.person_id, is_active: 1).first
            who = active_who if who.present?
          end
        end
        user = user_by_who( who )
      end

      # checking user matching
      if user.present? and who.present?
        user2 = user_by_who(who)
        raise "users do not match" if user != user2
      end

      return [ user, who ]
    end

    def user_by_who(who)
      if who.instance_of?(HR::Employee)
        who.user
      end
    end

    def whose_user(user)
      user.employee
    end
  end
end
