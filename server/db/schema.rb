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

ActiveRecord::Schema.define(version: 2019_04_11_075232) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.integer "parent_id"
    t.integer "lft", null: false
    t.integer "rgt", null: false
    t.integer "depth", default: 0, null: false
    t.integer "children_count", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name_zh"
    t.index ["lft"], name: "index_categories_on_lft"
    t.index ["parent_id"], name: "index_categories_on_parent_id"
    t.index ["rgt"], name: "index_categories_on_rgt"
  end

  create_table "package_categories", force: :cascade do |t|
    t.bigint "package_id"
    t.bigint "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_package_categories_on_category_id"
    t.index ["package_id"], name: "index_package_categories_on_package_id"
  end

  create_table "packages", force: :cascade do |t|
    t.string "name"
    t.string "authors", array: true
    t.string "uploaders", array: true
    t.string "pub_url"
    t.string "homepage"
    t.string "repository_url"
    t.text "about"
    t.string "license"
    t.integer "popularity"
    t.integer "health"
    t.integer "maintenance"
    t.integer "overall"
    t.string "published"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.string "video"
    t.string "aasm_state"
    t.jsonb "aasm_timestamps", default: {}
    t.string "version"
    t.string "error_messages", default: [], array: true
  end

  add_foreign_key "package_categories", "categories"
  add_foreign_key "package_categories", "packages"
end
