# -*- encoding : utf-8 -*-
module Document::Who
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def who_eval(whom, opts)
      id = opts[ "#{whom.to_s}_id".to_sym ]
      type = opts[ "#{whom.to_s}_type".to_sym ]

      if type.blank?
        if id.is_a?(String)
          if id[0] == 'P'
            id = id[1..-1].to_i ; type = 'HR::Employee'
          elsif id[0] == 'U'
            id = id[1..-1].to_i ; type = 'Sys::User'
          else
            id = id.to_i ; type = 'HR::Organization'
          end
        else
          type = 'HR::Organization'
        end
      end

      return [ nil, nil ] if ( id.blank? or type.blank? )

      who = user = nil
      if type == 'Sys::User'
        user = Sys::User.find(id)
        who = whose_user( user )
      else
        who = type.constantize.find(id)
        user = user_by_who( who )
      end

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
