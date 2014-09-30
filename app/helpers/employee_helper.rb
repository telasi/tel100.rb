# -*- encoding : utf-8 -*-
module EmployeeHelper

  def employee_org_chain(empl)
    empl.organization.chain.map do |x|
      "<span><code>#{x.saporg_number}</code> #{x.name}</span>"
    end.join('<hr style="margin: 5px 0; width: 600px;">')
  end

end
