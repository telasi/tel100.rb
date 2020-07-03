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

ActiveRecord::Schema.define(version: 20200626113747) do

  create_table "document_base", force: true do |t|
    t.string    "language",          limit: 2,                             default: "KA",    null: false
    t.integer   "parent_id",         limit: 10,   precision: 10, scale: 0
    t.integer   "type_id",           limit: 5,    precision: 5,  scale: 0
    t.string    "direction",         limit: 20,                            default: "inner", null: false
    t.string    "subject",           limit: 1000
    t.string    "original_number",   limit: 50
    t.datetime  "original_date"
    t.string    "docnumber",         limit: 20
    t.datetime  "docdate"
    t.integer   "docyear",           limit: 4,    precision: 4,  scale: 0
    t.integer   "page_count",        limit: 6,    precision: 6,  scale: 0
    t.integer   "additions_count",   limit: 6,    precision: 6,  scale: 0
    t.datetime  "due_date"
    t.datetime  "alarm_date"
    t.integer   "sender_user_id",    limit: 10,   precision: 10, scale: 0
    t.integer   "sender_id",         limit: 10,   precision: 10, scale: 0
    t.string    "sender_type",       limit: 50
    t.integer   "owner_user_id",     limit: 10,   precision: 10, scale: 0
    t.integer   "owner_id",          limit: 10,   precision: 10, scale: 0
    t.string    "owner_type",        limit: 50
    t.integer   "motions_total",     limit: 6,    precision: 6,  scale: 0, default: 0,       null: false
    t.integer   "motions_completed", limit: 6,    precision: 6,  scale: 0, default: 0,       null: false
    t.integer   "motions_canceled",  limit: 6,    precision: 6,  scale: 0, default: 0,       null: false
    t.integer   "comments_total",    limit: 6,    precision: 6,  scale: 0, default: 0,       null: false
    t.boolean   "status",                         precision: 1,  scale: 0, default: false,   null: false
    t.timestamp "created_at",        limit: 6,                                               null: false
    t.timestamp "sent_at",           limit: 6
    t.timestamp "received_at",       limit: 6
    t.timestamp "completed_at",      limit: 6
    t.timestamp "updated_at",        limit: 6,                                               null: false
    t.integer   "actual_sender_id",  limit: 10,   precision: 10, scale: 0
    t.string    "docnumber2",        limit: 20
    t.string    "additions"
  end

  create_table "document_change", force: true do |t|
    t.integer   "document_id", limit: 10,   precision: 10, scale: 0, null: false
    t.integer   "user_id",     limit: 10,   precision: 10, scale: 0, null: false
    t.timestamp "created_at",  limit: 6,                             null: false
    t.string    "subject",     limit: 1000
    t.string    "docnumber2",  limit: 20
    t.datetime  "docdate"
  end

  create_table "document_comment", force: true do |t|
    t.integer   "document_id",      limit: 10,   precision: 10, scale: 0, null: false
    t.integer   "motion_id",        limit: 10,   precision: 10, scale: 0
    t.integer   "user_id",          limit: 10,   precision: 10, scale: 0, null: false
    t.boolean   "status",                        precision: 1,  scale: 0, null: false
    t.boolean   "old_status",                    precision: 1,  scale: 0, null: false
    t.string    "role",             limit: 10,                            null: false
    t.string    "text",             limit: 1000
    t.timestamp "created_at",       limit: 6,                             null: false
    t.timestamp "updated_at",       limit: 6,                             null: false
    t.integer   "actual_user_id",   limit: 10,   precision: 10, scale: 0
    t.integer   "receiver_user_id", limit: 10,   precision: 10, scale: 0
  end

  create_table "document_file", force: true do |t|
    t.integer   "document_id",   limit: 10,  precision: 10, scale: 0,                 null: false
    t.string    "original_name", limit: 500,                                          null: false
    t.string    "store_name",    limit: 64,                                           null: false
    t.timestamp "created_at",    limit: 6,                                            null: false
    t.string    "folder",        limit: 64
    t.boolean   "archived",                  precision: 1,  scale: 0, default: false, null: false
  end

  create_table "document_file_history", force: true do |t|
    t.integer   "document_id",   limit: 10,  precision: 10, scale: 0,                 null: false
    t.string    "original_name", limit: 500,                                          null: false
    t.string    "store_name",    limit: 64,                                           null: false
    t.integer   "change_no",     limit: 10,  precision: 10, scale: 0
    t.timestamp "created_at",    limit: 6,                                            null: false
    t.string    "folder",        limit: 64
    t.boolean   "archived",                  precision: 1,  scale: 0, default: false, null: false
  end

  create_table "document_file_temp", force: true do |t|
    t.integer   "document_id",   limit: 10,  precision: 10, scale: 0,                 null: false
    t.string    "original_name", limit: 500,                                          null: false
    t.string    "store_name",    limit: 64,                                           null: false
    t.boolean   "state",                     precision: 1,  scale: 0, default: false, null: false
    t.timestamp "created_at",    limit: 6,                                            null: false
  end

  create_table "document_gnerc", primary_key: "document_id", force: true do |t|
    t.integer   "type_id",          limit: 5,   precision: 5,  scale: 0
    t.integer   "file_id",          limit: 10,  precision: 10, scale: 0
    t.timestamp "created_at",       limit: 6,                                            null: false
    t.boolean   "stage",                        precision: 1,  scale: 0, default: false, null: false
    t.timestamp "sent_at",          limit: 6
    t.boolean   "status",                       precision: 1,  scale: 0, default: false, null: false
    t.boolean   "mediate",                      precision: 1,  scale: 0, default: false, null: false
    t.boolean   "step",                         precision: 1,  scale: 0, default: false, null: false
    t.string    "gnerc_id",         limit: 20
    t.string    "customer_type",    limit: 20
    t.integer   "customer_id",      limit: 10,  precision: 10, scale: 0
    t.string    "customer_accnumb", limit: 10
    t.string    "customer_name",    limit: 200
    t.string    "customer_phone",   limit: 30
    t.string    "customer_email",   limit: 100
    t.string    "water_customer",   limit: 50
    t.string    "gas_customer",     limit: 50
    t.integer   "gas_provider",     limit: 10,  precision: 10, scale: 0
    t.boolean   "agree_water",                  precision: 1,  scale: 0
    t.boolean   "agree_gas",                    precision: 1,  scale: 0
    t.string    "customer_taxid",   limit: 12
  end

  create_table "document_motion", force: true do |t|
    t.integer   "parent_id",        limit: 12,   precision: 12, scale: 0
    t.integer   "document_id",      limit: 10,   precision: 10, scale: 0,                      null: false
    t.boolean   "is_new",                        precision: 1,  scale: 0, default: true,       null: false
    t.datetime  "due_date"
    t.integer   "ordering",         limit: 3,    precision: 3,  scale: 0, default: 999,        null: false
    t.integer   "send_type_id",     limit: 5,    precision: 5,  scale: 0
    t.string    "motion_text",      limit: 1000
    t.integer   "sender_user_id",   limit: 10,   precision: 10, scale: 0
    t.integer   "sender_id",        limit: 10,   precision: 10, scale: 0
    t.string    "sender_type",      limit: 50
    t.integer   "resp_type_id",     limit: 5,    precision: 5,  scale: 0
    t.string    "response_text",    limit: 1000
    t.integer   "receiver_user_id", limit: 10,   precision: 10, scale: 0
    t.integer   "receiver_id",      limit: 10,   precision: 10, scale: 0
    t.string    "receiver_type",    limit: 50
    t.string    "receiver_role",    limit: 10,                            default: "assignee", null: false
    t.boolean   "status",                        precision: 1,  scale: 0, default: false,      null: false
    t.timestamp "created_at",       limit: 6,                                                  null: false
    t.timestamp "sent_at",          limit: 6
    t.timestamp "received_at",      limit: 6
    t.timestamp "completed_at",     limit: 6
    t.timestamp "updated_at",       limit: 6,                                                  null: false
    t.integer   "actual_sender_id", limit: 10,   precision: 10, scale: 0
    t.integer   "last_receiver_id", limit: 10,   precision: 10, scale: 0
  end

  add_index "document_motion", ["document_id"], name: "docmotions_base_idx"
  add_index "document_motion", ["parent_id"], name: "docmotions_prnt_idx"

  create_table "document_motion_history", force: true do |t|
    t.integer   "parent_id",        limit: 12,   precision: 12, scale: 0
    t.integer   "document_id",      limit: 10,   precision: 10, scale: 0,                      null: false
    t.boolean   "is_new",                        precision: 1,  scale: 0, default: true,       null: false
    t.datetime  "due_date"
    t.integer   "ordering",         limit: 3,    precision: 3,  scale: 0, default: 999,        null: false
    t.integer   "send_type_id",     limit: 5,    precision: 5,  scale: 0
    t.string    "motion_text",      limit: 1000
    t.integer   "sender_user_id",   limit: 10,   precision: 10, scale: 0
    t.integer   "sender_id",        limit: 10,   precision: 10, scale: 0
    t.string    "sender_type",      limit: 50
    t.integer   "resp_type_id",     limit: 5,    precision: 5,  scale: 0
    t.string    "response_text",    limit: 1000
    t.integer   "receiver_user_id", limit: 10,   precision: 10, scale: 0
    t.integer   "receiver_id",      limit: 10,   precision: 10, scale: 0
    t.string    "receiver_type",    limit: 50
    t.string    "receiver_role",    limit: 10,                            default: "assignee", null: false
    t.boolean   "status",                        precision: 1,  scale: 0, default: false,      null: false
    t.timestamp "created_at",       limit: 6,                                                  null: false
    t.timestamp "sent_at",          limit: 6
    t.timestamp "received_at",      limit: 6
    t.timestamp "completed_at",     limit: 6
    t.timestamp "updated_at",       limit: 6,                                                  null: false
    t.integer   "change_no",        limit: 10,   precision: 10, scale: 0
    t.integer   "actual_sender_id", limit: 10,   precision: 10, scale: 0
    t.integer   "last_receiver_id", limit: 10,   precision: 10, scale: 0
    t.integer   "old_id",           limit: 12,   precision: 12, scale: 0
  end

  create_table "document_relation", force: true do |t|
    t.integer   "base_id",      limit: 10,  precision: 10, scale: 0, null: false
    t.integer   "related_id",   limit: 10,  precision: 10, scale: 0, null: false
    t.timestamp "created_at",   limit: 6,                            null: false
    t.string    "related_type", limit: 100
  end

  create_table "document_response_types", force: true do |t|
    t.string    "role",       limit: 15,                         null: false
    t.boolean   "direction",             precision: 1, scale: 0, null: false
    t.integer   "ordering",   limit: 5,  precision: 5, scale: 0, null: false
    t.string    "name_ka",    limit: 50,                         null: false
    t.string    "name_ru",    limit: 50
    t.string    "name_en",    limit: 50
    t.timestamp "created_at", limit: 6,                          null: false
    t.timestamp "updated_at", limit: 6,                          null: false
  end

  add_index "document_response_types", ["role", "direction", "ordering"], name: "docresptype_role_dirct_idx"

  create_table "document_sms", force: true do |t|
    t.integer   "base_id",    limit: 10,  precision: 10, scale: 0, null: false
    t.integer   "user_id",    limit: 10,  precision: 10, scale: 0, null: false
    t.string    "text",       limit: 500,                          null: false
    t.timestamp "created_at", limit: 6,                            null: false
    t.integer   "answer_id",  limit: 10,  precision: 10, scale: 0
    t.timestamp "sent_at",    limit: 6
    t.boolean   "active",                 precision: 1,  scale: 0
    t.string    "phone",      limit: 10
  end

  create_table "document_text", primary_key: "document_id", force: true do |t|
    t.text "body"
  end

  create_table "document_text_history", force: true do |t|
    t.integer "document_id", limit: 10, precision: 10, scale: 0, null: false
    t.text    "body"
    t.integer "change_no",   limit: 10, precision: 10, scale: 0
  end

  create_table "document_type", force: true do |t|
    t.string    "name_ka",        limit: 50,                                          null: false
    t.string    "name_ru",        limit: 50
    t.string    "name_en",        limit: 50
    t.integer   "order_by",       limit: 5,  precision: 5,  scale: 0, default: 0,     null: false
    t.timestamp "created_at",     limit: 6,                                           null: false
    t.timestamp "updated_at",     limit: 6,                                           null: false
    t.boolean   "is_special",                precision: 1,  scale: 0, default: false, null: false
    t.boolean   "allow_inner",               precision: 1,  scale: 0, default: true,  null: false
    t.boolean   "allow_in",                  precision: 1,  scale: 0, default: true,  null: false
    t.boolean   "allow_out",                 precision: 1,  scale: 0, default: true,  null: false
    t.boolean   "is_gnerc",                  precision: 1,  scale: 0, default: false, null: false
    t.integer   "deadline",       limit: 12, precision: 12, scale: 0, default: 0,     null: false
    t.integer   "margin_top",     limit: 5,  precision: 5,  scale: 0
    t.integer   "margin_bottom",  limit: 5,  precision: 5,  scale: 0
    t.integer   "margin_top_out", limit: 5,  precision: 5,  scale: 0
    t.boolean   "print_header",              precision: 1,  scale: 0
  end

  create_table "document_type_gnerc_subtype", force: true do |t|
    t.string    "name_ka",    limit: 150,                                      null: false
    t.string    "name_ru",    limit: 150
    t.string    "name_en",    limit: 150
    t.timestamp "created_at", limit: 6,                                        null: false
    t.timestamp "updated_at", limit: 6,                                        null: false
    t.boolean   "old",                    precision: 1,  scale: 0
    t.integer   "deadline",   limit: 12,  precision: 12, scale: 0, default: 0, null: false
  end

  create_table "document_user", id: false, force: true do |t|
    t.integer   "document_id",        limit: 10, precision: 10, scale: 0,                 null: false
    t.integer   "user_id",            limit: 10, precision: 10, scale: 0,                 null: false
    t.boolean   "has_due_date",                  precision: 1,  scale: 0, default: false, null: false
    t.boolean   "completed_over_due",            precision: 1,  scale: 0, default: false, null: false
    t.datetime  "current_due_date"
    t.boolean   "is_new",                        precision: 1,  scale: 0, default: true,  null: false
    t.boolean   "is_changed",                    precision: 1,  scale: 0, default: true,  null: false
    t.boolean   "is_shown",                      precision: 1,  scale: 0, default: false, null: false
    t.boolean   "is_forwarded",                  precision: 1,  scale: 0, default: false, null: false
    t.boolean   "is_sent",                       precision: 1,  scale: 0, default: false, null: false
    t.boolean   "is_received",                   precision: 1,  scale: 0, default: false, null: false
    t.boolean   "is_current",                    precision: 1,  scale: 0, default: false, null: false
    t.boolean   "is_canceled",                   precision: 1,  scale: 0, default: false, null: false
    t.boolean   "is_completed",                  precision: 1,  scale: 0, default: false, null: false
    t.boolean   "as_owner",                      precision: 1,  scale: 0, default: false, null: false
    t.boolean   "as_sender",                     precision: 1,  scale: 0, default: false, null: false
    t.boolean   "as_assignee",                   precision: 1,  scale: 0, default: false, null: false
    t.boolean   "as_signee",                     precision: 1,  scale: 0, default: false, null: false
    t.boolean   "as_author",                     precision: 1,  scale: 0, default: false, null: false
    t.timestamp "created_at",         limit: 6,                                           null: false
    t.timestamp "updated_at",         limit: 6,                                           null: false
    t.timestamp "receive_date",       limit: 6
  end

  add_index "document_user", ["SYS_EXTRACT_UTC(\"RECEIVE_DATE\")"], name: "docuser_receive_date_idx"
  add_index "document_user", ["as_assignee"], name: "document_user_asassignee_idx"
  add_index "document_user", ["as_author"], name: "document_user_asauthor_idx"
  add_index "document_user", ["as_owner"], name: "document_user_asowner_idx"
  add_index "document_user", ["as_signee"], name: "document_user_assignee_idx"
  add_index "document_user", ["is_canceled"], name: "document_user_iscanceled_idx"
  add_index "document_user", ["is_changed"], name: "document_user_ischanged_idx"
  add_index "document_user", ["is_completed"], name: "document_user_iscompleted_idx"
  add_index "document_user", ["is_current"], name: "document_user_iscurrent_idx"
  add_index "document_user", ["is_forwarded"], name: "document_user_isforwarded_idx"
  add_index "document_user", ["is_new"], name: "document_user_isnew_idx"
  add_index "document_user", ["is_received"], name: "document_user_isreceived_idx"
  add_index "document_user", ["is_sent"], name: "document_user_issent_idx"
  add_index "document_user", ["is_shown"], name: "document_user_isshown_idx"

  create_table "folder_base", force: true do |t|
    t.integer   "owner_id",    limit: 10,   precision: 10, scale: 0, null: false
    t.string    "name",        limit: 100
    t.string    "folder_type", limit: 50,                            null: false
    t.string    "form",        limit: 1000
    t.integer   "order_by",    limit: 3,    precision: 3,  scale: 0
    t.integer   "parent_id",   limit: 10,   precision: 10, scale: 0
    t.timestamp "created_at",  limit: 6,                             null: false
    t.timestamp "updated_at",  limit: 6,                             null: false
  end

  add_index "folder_base", ["owner_id"], name: "owner_id_idx"

  create_table "folder_documents", force: true do |t|
    t.integer   "folder_id",  limit: 10, precision: 10, scale: 0, null: false
    t.integer   "doc_id",     limit: 10, precision: 10, scale: 0, null: false
    t.timestamp "created_at", limit: 6,                           null: false
    t.timestamp "updated_at", limit: 6,                           null: false
  end

  add_index "folder_documents", ["folder_id", "doc_id"], name: "folder_doc_unique", unique: true

  create_table "gas_providers", force: true do |t|
    t.string    "name",        limit: 50
    t.string    "description", limit: 1000
    t.timestamp "created_at",  limit: 6,    null: false
    t.timestamp "updated_at",  limit: 6,    null: false
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
    t.boolean   "custom",                        precision: 1,  scale: 0
  end

  add_index "hr_employees", ["is_active", "person_id"], name: "hr_employees_status_idx"

  create_table "hr_employees2", id: false, force: true do |t|
    t.integer   "id",                 limit: 10, precision: 10, scale: 0, null: false
    t.boolean   "is_active",                     precision: 1,  scale: 0, null: false
    t.integer   "person_id",          limit: 8,  precision: 8,  scale: 0, null: false
    t.integer   "user_id",            limit: 10, precision: 10, scale: 0
    t.string    "first_name_ka",      limit: 50,                          null: false
    t.string    "first_name_ru",      limit: 50
    t.string    "first_name_en",      limit: 50
    t.string    "last_name_ka",       limit: 50,                          null: false
    t.string    "last_name_ru",       limit: 50
    t.string    "last_name_en",       limit: 50
    t.string    "gender",             limit: 1,                           null: false
    t.integer   "organization_id",    limit: 10, precision: 10, scale: 0
    t.boolean   "employee_status_id",            precision: 1,  scale: 0, null: false
    t.timestamp "created_at",         limit: 6,                           null: false
    t.timestamp "updated_at",         limit: 6,                           null: false
    t.boolean   "custom",                        precision: 1,  scale: 0
  end

  create_table "hr_employees_backup", id: false, force: true do |t|
    t.integer   "id",                 limit: 10, precision: 10, scale: 0, null: false
    t.boolean   "is_active",                     precision: 1,  scale: 0, null: false
    t.integer   "person_id",          limit: 8,  precision: 8,  scale: 0, null: false
    t.integer   "user_id",            limit: 10, precision: 10, scale: 0
    t.string    "first_name_ka",      limit: 50,                          null: false
    t.string    "first_name_ru",      limit: 50
    t.string    "first_name_en",      limit: 50
    t.string    "last_name_ka",       limit: 50,                          null: false
    t.string    "last_name_ru",       limit: 50
    t.string    "last_name_en",       limit: 50
    t.string    "gender",             limit: 1,                           null: false
    t.integer   "organization_id",    limit: 10, precision: 10, scale: 0
    t.boolean   "employee_status_id",            precision: 1,  scale: 0, null: false
    t.timestamp "created_at",         limit: 6,                           null: false
    t.timestamp "updated_at",         limit: 6,                           null: false
    t.boolean   "custom",                        precision: 1,  scale: 0
  end

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
    t.boolean   "custom",                   precision: 1,  scale: 0
  end

  create_table "hr_organizations2", id: false, force: true do |t|
    t.integer   "id",           limit: 10,  precision: 10, scale: 0, null: false
    t.integer   "parent_id",    limit: 10,  precision: 10, scale: 0
    t.integer   "tree_level",   limit: 3,   precision: 3,  scale: 0, null: false
    t.boolean   "is_active",                precision: 1,  scale: 0, null: false
    t.integer   "saporg_id",    limit: 8,   precision: 8,  scale: 0
    t.string    "saporg_type",  limit: 1
    t.integer   "sapparent_id", limit: 8,   precision: 8,  scale: 0
    t.string    "name_ka",      limit: 500,                          null: false
    t.string    "name_ru",      limit: 500
    t.string    "name_en",      limit: 500
    t.boolean   "is_manager",               precision: 1,  scale: 0, null: false
    t.string    "priority",     limit: 2
    t.timestamp "created_at",   limit: 6,                            null: false
    t.timestamp "updated_at",   limit: 6,                            null: false
    t.boolean   "custom",                   precision: 1,  scale: 0
  end

  create_table "hr_organizations_backup", id: false, force: true do |t|
    t.integer   "id",           limit: 10,  precision: 10, scale: 0, null: false
    t.integer   "parent_id",    limit: 10,  precision: 10, scale: 0
    t.integer   "tree_level",   limit: 3,   precision: 3,  scale: 0, null: false
    t.boolean   "is_active",                precision: 1,  scale: 0, null: false
    t.integer   "saporg_id",    limit: 8,   precision: 8,  scale: 0
    t.string    "saporg_type",  limit: 1
    t.integer   "sapparent_id", limit: 8,   precision: 8,  scale: 0
    t.string    "name_ka",      limit: 500,                          null: false
    t.string    "name_ru",      limit: 500
    t.string    "name_en",      limit: 500
    t.boolean   "is_manager",               precision: 1,  scale: 0, null: false
    t.string    "priority",     limit: 2
    t.timestamp "created_at",   limit: 6,                            null: false
    t.timestamp "updated_at",   limit: 6,                            null: false
    t.boolean   "custom",                   precision: 1,  scale: 0
  end

  create_table "hr_vacation", id: false, force: true do |t|
    t.integer   "id",              limit: 10, precision: 10, scale: 0, null: false
    t.integer   "employee_id",     limit: 10, precision: 10, scale: 0, null: false
    t.integer   "person_id",       limit: 10, precision: 10, scale: 0, null: false
    t.datetime  "from_date"
    t.datetime  "to_date"
    t.integer   "vacation_type",   limit: 3,  precision: 3,  scale: 0
    t.integer   "substitude",      limit: 10, precision: 10, scale: 0
    t.integer   "sub_person_id",   limit: 10, precision: 10, scale: 0
    t.boolean   "substitude_type",            precision: 1,  scale: 0
    t.boolean   "confirmed",                  precision: 1,  scale: 0
    t.timestamp "created_at",      limit: 6,                           null: false
    t.timestamp "updated_at",      limit: 6,                           null: false
  end

  create_table "hr_vacation_type", force: true do |t|
    t.string "name_ka", limit: 100
    t.string "name_ru", limit: 100
    t.string "name_en", limit: 100
  end

  create_table "party_base", force: true do |t|
    t.string    "org_type",   limit: 20,  null: false
    t.string    "identity",   limit: 30
    t.string    "name_ka",    limit: 200
    t.string    "name_ru",    limit: 200
    t.string    "name_en",    limit: 200
    t.string    "address_ka", limit: 500
    t.string    "address_ru", limit: 500
    t.string    "address_en", limit: 500
    t.string    "contact_ka", limit: 200
    t.string    "contact_ru", limit: 200
    t.string    "contact_en", limit: 200
    t.string    "phones",     limit: 100
    t.string    "email",      limit: 50
    t.string    "customer",   limit: 50
    t.timestamp "created_at", limit: 6,   null: false
    t.timestamp "updated_at", limit: 6,   null: false
  end

  create_table "party_base_copy", id: false, force: true do |t|
    t.integer   "id",         limit: 10,  precision: 10, scale: 0, null: false
    t.string    "org_type",   limit: 20,                           null: false
    t.string    "identity",   limit: 30
    t.string    "name_ka",    limit: 200
    t.string    "name_ru",    limit: 200
    t.string    "name_en",    limit: 200
    t.string    "address_ka", limit: 500
    t.string    "address_ru", limit: 500
    t.string    "address_en", limit: 500
    t.string    "contact_ka", limit: 200
    t.string    "contact_ru", limit: 200
    t.string    "contact_en", limit: 200
    t.string    "phones",     limit: 100
    t.string    "email",      limit: 50
    t.string    "customer",   limit: 50
    t.timestamp "created_at", limit: 6,                            null: false
    t.timestamp "updated_at", limit: 6,                            null: false
  end

  create_table "party_contacts", force: true do |t|
    t.integer   "parent_id",     limit: 10, precision: 10, scale: 0
    t.string    "first_name_ka", limit: 50,                          null: false
    t.string    "first_name_ru", limit: 50
    t.string    "first_name_en", limit: 50
    t.string    "last_name_ka",  limit: 50,                          null: false
    t.string    "last_name_ru",  limit: 50
    t.string    "last_name_en",  limit: 50
    t.string    "phones",        limit: 20
    t.string    "email",         limit: 50
    t.string    "account",       limit: 50
    t.timestamp "created_at",    limit: 6,                           null: false
    t.timestamp "updated_at",    limit: 6,                           null: false
  end

  create_table "party_favourites", force: true do |t|
    t.integer   "user_id",     limit: 10, precision: 10, scale: 0, null: false
    t.integer   "person_id",   limit: 10, precision: 10, scale: 0, null: false
    t.string    "person_type", limit: 50,                          null: false
    t.timestamp "created_at",  limit: 6,                           null: false
  end

  create_table "permissions", force: true do |t|
    t.string    "role",       limit: 100
    t.string    "permission", limit: 200
    t.string    "action",     limit: 200
    t.timestamp "created_at", limit: 6,   null: false
    t.timestamp "updated_at", limit: 6,   null: false
  end

  create_table "roles", force: true do |t|
    t.string    "name",       limit: 100
    t.integer   "category",   limit: 10,  precision: 10, scale: 0
    t.timestamp "created_at", limit: 6,                            null: false
    t.timestamp "updated_at", limit: 6,                            null: false
  end

  create_table "sap_organization_texts", id: false, force: true do |t|
    t.integer  "objectid",   limit: 8,   precision: 8, scale: 0, null: false
    t.string   "objecttype", limit: 1,                           null: false
    t.datetime "begin_date",                                     null: false
    t.datetime "end_date",                                       null: false
    t.string   "language",   limit: 2,                           null: false
    t.string   "name",       limit: 500
  end

  create_table "sap_organizations", id: false, force: true do |t|
    t.integer  "objectid",   limit: 8,   precision: 8, scale: 0, null: false
    t.string   "objecttype", limit: 1,                           null: false
    t.datetime "begin_date",                                     null: false
    t.datetime "end_date",                                       null: false
    t.string   "language",   limit: 2,                           null: false
    t.string   "short_name", limit: 200
  end

  create_table "sap_person_name", id: false, force: true do |t|
    t.integer  "person_id",  limit: 8,   precision: 8, scale: 0, null: false
    t.datetime "begin_date",                                     null: false
    t.datetime "end_date",                                       null: false
    t.string   "language",   limit: 2,                           null: false
    t.string   "firstname",  limit: 100
    t.string   "lastname",   limit: 100
    t.string   "middlename", limit: 100
    t.string   "gender",     limit: 1
  end

  create_table "sap_person_org", id: false, force: true do |t|
    t.integer  "person_id",    limit: 8, precision: 8, scale: 0, null: false
    t.datetime "begin_date",                                     null: false
    t.datetime "end_date",                                       null: false
    t.integer  "organization", limit: 8, precision: 8, scale: 0
    t.integer  "shtat",        limit: 8, precision: 8, scale: 0
  end

  create_table "sap_persons", id: false, force: true do |t|
    t.integer  "person_id",  limit: 8, precision: 8, scale: 0, null: false
    t.datetime "begin_date",                                   null: false
    t.datetime "end_date",                                     null: false
    t.boolean  "status",               precision: 1, scale: 0
  end

  create_table "sap_relations", id: false, force: true do |t|
    t.integer  "objectid",     limit: 8,  precision: 8, scale: 0, null: false
    t.string   "objecttype",   limit: 1,                          null: false
    t.datetime "begin_date",                                      null: false
    t.datetime "end_date",                                        null: false
    t.string   "relation",     limit: 4,                          null: false
    t.string   "varyf",        limit: 10,                         null: false
    t.string   "priority",     limit: 2
    t.integer  "rel_obj_id",   limit: 8,  precision: 8, scale: 0, null: false
    t.string   "rel_obj_type", limit: 1,                          null: false
  end

  create_table "sms_templates", id: false, force: true do |t|
    t.integer "type_id",     limit: 5,   precision: 5, scale: 0, null: false
    t.integer "subtype_id",  limit: 5,   precision: 5, scale: 0
    t.string  "description", limit: 150
    t.string  "text",        limit: 500
  end

  create_table "upload_file", id: false, force: true do |t|
    t.integer   "document_id", limit: 10, precision: 10, scale: 0, null: false
    t.integer   "user_id",     limit: 10, precision: 10, scale: 0, null: false
    t.timestamp "created_at",  limit: 6,                           null: false
    t.timestamp "updated_at",  limit: 6,                           null: false
  end

  create_table "user_relations", id: false, force: true do |t|
    t.integer "user_id",    limit: 10, precision: 10, scale: 0, null: false
    t.integer "related_id", limit: 10, precision: 10, scale: 0, null: false
    t.string  "role",       limit: 50,                          null: false
  end

  create_table "user_roles", force: true do |t|
    t.integer   "user_id",    limit: 10, precision: 10, scale: 0
    t.integer   "role_id",    limit: 10, precision: 10, scale: 0
    t.timestamp "created_at", limit: 6,                           null: false
    t.timestamp "updated_at", limit: 6,                           null: false
  end

  create_table "user_settings", primary_key: "user_id", force: true do |t|
    t.boolean "notif_mail", precision: 1, scale: 0, default: false, null: false
    t.boolean "notif_sms",  precision: 1, scale: 0, default: false, null: false
  end

  create_table "user_templates", force: true do |t|
    t.integer   "user_id",    limit: 10,  precision: 10, scale: 0
    t.string    "name",       limit: 100
    t.boolean   "category",               precision: 1,  scale: 0
    t.text      "body"
    t.timestamp "created_at", limit: 6,                            null: false
    t.timestamp "updated_at", limit: 6,                            null: false
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
    t.string    "eflow_user_name",  limit: 100
    t.boolean   "is_director",                  precision: 1,  scale: 0, default: false, null: false
  end

  add_index "users", ["email"], name: "users_email_idx", unique: true
  add_index "users", ["username"], name: "users_username_idx", unique: true

end
