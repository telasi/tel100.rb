# -*- encoding : utf-8 -*-
module Document::Direction
  INNER = 'inner'
  IN = 'in'
  OUT = 'out'

  def inner_party?(party)
    if party.present?
      return ['Sys::User', 'HR::Employee', 'HR::Organization'].include?(party.class.name)
    end
  end

  def outer_party?(party)
    if party.present?
      not self.inner_party?(party)
    end
  end
end
