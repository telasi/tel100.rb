# -*- encoding : utf-8 -*-
module EmployeeHelper

  def employee_org_chain(empl)
    empl.organization.chain.map{|x| "<span><code>#{x.saporg_id}</code> #{x.name}</span>"}.join('<hr style="margin: 5px 0; width: 600px;">')
  end

end
