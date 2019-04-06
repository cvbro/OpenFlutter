require 'carrierwave/orm/activerecord'
class Package < ApplicationRecord
  include PgSearch
  mount_uploader :image, ImageUploader
  mount_uploader :video, VideoUploader

  pg_search_scope :search_by_keyword, against: :name
end
