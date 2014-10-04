# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140924115538) do

  create_table "hr_employees", force: true do |t|
    t.boolean   "is_active",                     precision: 1,  scale: 0, default: true,  null: false
    t.integer   "person_id",          limit: 8,  precision: 8,  scale: 0,                 null: false
    t.integer   "user_id",            limit: 10, precision: 10, scale: 0
    t.string    "first_name_ka",      limit: 50,                                          null: false
    t.string    "first_name_ru",      limit: 50
    t.string    "first_name_en",      limit: 50
    t.string    "last_name_ka",       limit: 50,                                          null: false
    t.string    "last_name_ru",       limit: 50
    t.string    "last_name_en",       limit: 50
    t.integer   "organization_id",    limit: 10, precision: 10, scale: 0,                 null: false
    t.boolean   "employee_status_id",            precision: 1,  scale: 0, default: false, null: false
    t.timestamp "created_at",         limit: 6,                                           null: false
    t.timestamp "updated_at",         limit: 6,                                           null: false
  end

  add_index "hr_employees", ["is_active", "person_id"], name: "hr_employees_status_idx"

  create_table "hr_organizations", force: true do |t|
    t.integer   "parent_id",    limit: 10,  precision: 10, scale: 0
    t.integer   "tree_level",   limit: 3,   precision: 3,  scale: 0, default: 0,     null: false
    t.boolean   "is_active",                precision: 1,  scale: 0, default: true,  null: false
    t.integer   "saporg_id",    limit: 8,   precision: 8,  scale: 0,                 null: false
    t.string    "saporg_type",  limit: 1,                                            null: false
    t.integer   "sapparent_id", limit: 8,   precision: 8,  scale: 0
    t.string    "name_ka",      limit: 500,                                          null: false
    t.string    "name_ru",      limit: 500
    t.string    "name_en",      limit: 500
    t.boolean   "is_manager",               precision: 1,  scale: 0, default: false, null: false
    t.string    "priority",     limit: 2
    t.timestamp "created_at",   limit: 6,                                            null: false
    t.timestamp "updated_at",   limit: 6,                                            null: false
  end

  create_table "users", force: true do |t|
    t.string    "email",            limit: 100
    t.string    "mobile",           limit: 100
    t.string    "phone",            limit: 10
    t.string    "username",         limit: 100,                                          null: false
    t.boolean   "email_confirmed",              precision: 1,  scale: 0, default: false, null: false
    t.boolean   "mobile_confirmed",             precision: 1,  scale: 0, default: false, null: false
    t.boolean   "is_active",                    precision: 1,  scale: 0, default: true,  null: false
    t.boolean   "is_admin",                     precision: 1,  scale: 0, default: false, null: false
    t.integer   "employee_id",      limit: 10,  precision: 10, scale: 0,                 null: false
    t.string    "person_id",        limit: 8,                                            null: false
    t.string    "first_name_ka",    limit: 50,                                           null: false
    t.string    "first_name_ru",    limit: 50
    t.string    "first_name_en",    limit: 50
    t.string    "last_name_ka",     limit: 50,                                           null: false
    t.string    "last_name_ru",     limit: 50
    t.string    "last_name_en",     limit: 50
    t.string    "password_hash",    limit: 60,                                           null: false
    t.timestamp "created_at",       limit: 6,                                            null: false
    t.timestamp "updated_at",       limit: 6,                                            null: false
  end

  add_index "users", ["email"], name: "users_email_idx", unique: true
  add_index "users", ["username"], name: "users_username_idx", unique: true

end
