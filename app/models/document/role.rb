# -*- encoding : utf-8 -*-
module Document::Role
  # მფლობელი
  ROLE_OWNER    = 'owner'
  # შემქმენლი/ინიტციატორი
  ROLE_CREATOR   = 'sender'
  # ავტორი
  ROLE_AUTHOR   = 'author'
  # ხელმომწერი
  ROLE_SIGNEE   = 'signee'
  # შემსრულებელი
  ROLE_ASSIGNEE = 'assignee'

  ROLES = [
    ROLE_OWNER,
    ROLE_CREATOR,
    ROLE_AUTHOR,
    ROLE_SIGNEE,
    ROLE_ASSIGNEE
  ]

  # Compare two roles.
  #
  # @returns +1 if role1 > role2
  #          -1 if role1 < role2
  #           0 if role1 = role2
  def self.compare(role1, role2)
    indx1 = ROLES.index(role1)
    indx2 = ROLES.index(role2)
    raise "unknown role: #{role1}" unless indx1
    raise "unknown role: #{role2}" unless indx2
    return  0 if indx1 == indx2
    return +1 if indx1 < indx2
    return -1
  end
end
