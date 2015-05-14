# -*- encoding : utf-8 -*-
class Sys::UserRelation < ActiveRecord::Base
  self.table_name  = 'user_relations'
  self.primary_keys = :user_id, :related_id
  belongs_to :user, class_name: 'Sys::User'
  belongs_to :related, class_name: 'Sys::User'

  # Generates related users for this user.
  def self.generate(user)
    Sys::UserRelation.where(user: user).destroy_all
    return unless user.employee.present?
    return unless user.employee.organization.manager?
    org = user.employee.organization.parent
    return unless org.present?
    Sys::UserRelation.users(org).each do |u|
      Sys::UserRelation.create(user: user, related: u)
    end
  end

  def self.users(org)
    empoyees = HR::Employee.where(organization: org)
    if empoyees.any?
      (employees.map { |x| x.user }).compact
    else
      users = []
      HR::Organization.where(parent: org).each do |ch|
        users.push Sys::UserRelation.users(ch)
      end
      users.flatten
    end
  end
end
