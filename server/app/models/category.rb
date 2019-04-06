class Category < ApplicationRecord
  include PgSearch
  acts_as_nested_set
  pg_search_scope :search_by_keyword, against: :name
end
