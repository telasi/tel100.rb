# -*- encoding : utf-8 -*-
class Sys::UserRelation < ActiveRecord::Base
  REL_HRTREE = 'hrtree'
  REL_CANCELARIA = 'cancelaria'
  REL_JUSTICE = 'justice'
  REL_AUTO_ASSIGNEE = 'auto-assignee'

  RELATIONS = [ REL_HRTREE, REL_CANCELARIA, REL_JUSTICE, REL_AUTO_ASSIGNEE ]

  self.table_name  = 'user_relations'
  self.primary_keys = :user_id, :related_id, :role
  belongs_to :user, class_name: 'Sys::User'
  belongs_to :related, class_name: 'Sys::User'

  validates_presence_of :user, :related, :role

  # Generates related users for this user.
  def self.generate(user)
    Sys::UserRelation.where(user: user, role: REL_HRTREE).destroy_all
    if user.username == HR_SUPER_USER
      Sys::User.all.each do |u|
        Sys::UserRelation.create(user: user, related: u, role: REL_HRTREE) if u.id != user.id
      end
    else
      return unless user.employee.present?
      return unless user.employee.organization.manager?
      org = user.employee.organization.parent
      return unless org.present?
      Sys::UserRelation.users(org).each do |u|
        Sys::UserRelation.create(user: user, related: u, role: REL_HRTREE) if u.id != user.id
      end
    end
  end

  def self.users(org)
    employees = HR::Employee.where(organization: org)
    if employees.any?
      (employees.map { |x| x.user }).compact
    else
      users = []
      HR::Organization.where(parent: org).each do |ch|
        users.push Sys::UserRelation.users(ch)
      end
      users.flatten
    end
  end

  def self.generate_bcs
    log = []
    bcs = Sys::User.where(first_name_ka: 'ბიზნეს-ცენტრი')
    bcs.each do |bc|
      org = HR::Organization.where(is_active: 1, name_ka: [bc.first_name_ka, bc.last_name_ka].join(' ')).first
      next unless org.present?
      log_org = {}
      log_org[:users] = []

      log_org[:bc] = org.name

      org.all_user.each do |u|
        log_user = {}
        log_user[:username] = u.username
        log_user[:name] = u.to_s
        log_user[:deleted] = Sys::UserRelation.where(user: u, role: REL_AUTO_ASSIGNEE).to_a
        log_user[:created] = bc.username if bc.id != u.id

        log_user[:changed] = log_user[:deleted].length > 1 || ( log_user[:deleted].length == 1 && log_user[:deleted][0].related != bc )

        Sys::UserRelation.where(user: user, role: REL_AUTO_ASSIGNEE).destroy_all
        Sys::UserRelation.create(user: user, related: bc, role: REL_AUTO_ASSIGNEE) if bc.id != user.id

        log_org[:users] << log_user
      end
      log << log_org
    end
    log
  end
end
