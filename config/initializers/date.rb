# -*- encoding : utf-8 -*-
class Date
  def self.eval(val)
    if val.present?
      if val.is_a?(Date) then val
      else Date.parse(val) end
    end
  end
end
