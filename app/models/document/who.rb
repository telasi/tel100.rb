# -*- encoding : utf-8 -*-
module Document::Who

  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def who_eval(whom, opts)
      data = opts[whom]
      who = user = text = nil

      if data.instance_of?(Hash)
        if data[:user] then  user = data[:user] ; who  = whose_user(user)
        elsif data[:who] then  who = data[:who] ; user = user_by_who(who)
        end
        text = data[:text]
      end

      # checking data
      if user.present? and who.present?
        user2 = user_by_who(who)
        raise "users do not match" if user != user2
      end
      raise "not a user: #{user}" if (user.present? and not user.instance_of?(Sys::User))

      [ user, who, text ]
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
