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

ActiveRecord::Schema.define(version: 20141113103651) do

  create_table "document_base", force: true do |t|
    t.string    "language",        limit: 2,                             default: "KA",    null: false
    t.integer   "parent_id",       limit: 10,   precision: 10, scale: 0
    t.integer   "type_id",         limit: 5,    precision: 5,  scale: 0,                   null: false
    t.string    "direction",       limit: 20,                            default: "inner", null: false
    t.string    "subject",         limit: 1000
    t.string    "original_number", limit: 50
    t.datetime  "original_date"
    t.string    "docnumber",       limit: 20
    t.datetime  "docdate",                                                                 null: false
    t.integer   "docyear",         limit: 4,    precision: 4,  scale: 0,                   null: false
    t.integer   "page_count",      limit: 6,    precision: 6,  scale: 0
    t.integer   "additions_count", limit: 6,    precision: 6,  scale: 0
    t.datetime  "due_date"
    t.datetime  "alarm_date"
    t.boolean   "status",                       precision: 1,  scale: 0, default: false,   null: false
    t.integer   "sender_user_id",  limit: 10,   precision: 10, scale: 0
    t.integer   "sender_id",       limit: 10,   precision: 10, scale: 0
    t.string    "sender_type",     limit: 50
    t.integer   "owner_user_id",   limit: 10,   precision: 10, scale: 0
    t.integer   "owner_id",        limit: 10,   precision: 10, scale: 0
    t.string    "owner_type",      limit: 50
    t.timestamp "created_at",      limit: 6,                                               null: false
    t.timestamp "updated_at",      limit: 6,                                               null: false
  end

  create_table "document_motion", force: true do |t|
    t.integer   "parent_id",        limit: 12,   precision: 12, scale: 0
    t.integer   "document_id",      limit: 10,   precision: 10, scale: 0,                      null: false
    t.boolean   "status",                        precision: 1,  scale: 0, default: false,      null: false
    t.datetime  "due_date"
    t.integer   "ordering",         limit: 3,    precision: 3,  scale: 0, default: 999,        null: false
    t.string    "motion_text",      limit: 1000
    t.integer   "sender_user_id",   limit: 10,   precision: 10, scale: 0
    t.integer   "sender_id",        limit: 10,   precision: 10, scale: 0
    t.string    "sender_type",      limit: 50
    t.string    "response_text",    limit: 1000
    t.integer   "receiver_user_id", limit: 10,   precision: 10, scale: 0
    t.integer   "receiver_id",      limit: 10,   precision: 10, scale: 0
    t.string    "receiver_type",    limit: 50
    t.string    "receiver_role",    limit: 10,                            default: "assignee", null: false
    t.timestamp "created_at",       limit: 6,                                                  null: false
    t.timestamp "updated_at",       limit: 6,                                                  null: false
  end

  add_index "document_motion", ["document_id"], name: "docmotions_base_idx"
  add_index "document_motion", ["parent_id"], name: "docmotions_prnt_idx"

  create_table "document_text", primary_key: "document_id", force: true do |t|
    t.text "body"
  end

  create_table "document_type", force: true do |t|
    t.string    "name_ka",    limit: 50,                                     null: false
    t.string    "name_ru",    limit: 50
    t.string    "name_en",    limit: 50
    t.integer   "order_by",   limit: 5,  precision: 5, scale: 0, default: 0, null: false
    t.timestamp "created_at", limit: 6,                                      null: false
    t.timestamp "updated_at", limit: 6,                                      null: false
  end

  create_table "document_user", id: false, force: true do |t|
    t.integer   "document_id", limit: 10, precision: 10, scale: 0,                 null: false
    t.integer   "user_id",     limit: 10, precision: 10, scale: 0,                 null: false
    t.boolean   "status",                 precision: 1,  scale: 0, default: false, null: false
    t.boolean   "is_read",                precision: 1,  scale: 0, default: false, null: false
    t.timestamp "updated_at",  limit: 6,                                           null: false
  end

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
    t.string    "gender",             limit: 1,                           default: "N",   null: false
    t.integer   "organization_id",    limit: 10, precision: 10, scale: 0
    t.boolean   "employee_status_id",            precision: 1,  scale: 0, default: false, null: false
    t.timestamp "created_at",         limit: 6,                                           null: false
    t.timestamp "updated_at",         limit: 6,                                           null: false
  end

  add_index "hr_employees", ["is_active", "person_id"], name: "hr_employees_status_idx"

  create_table "hr_organizations", force: true do |t|
    t.integer   "parent_id",    limit: 10,  precision: 10, scale: 0
    t.integer   "tree_level",   limit: 3,   precision: 3,  scale: 0, default: 0,     null: false
    t.boolean   "is_active",                precision: 1,  scale: 0, default: true,  null: false
    t.integer   "saporg_id",    limit: 8,   precision: 8,  scale: 0
    t.string    "saporg_type",  limit: 1
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
    t.integer   "employee_id",      limit: 10,  precision: 10, scale: 0
    t.integer   "person_id",        limit: 8,   precision: 8,  scale: 0
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
