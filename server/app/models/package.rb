require 'carrierwave/orm/activerecord'
class Package < ApplicationRecord
  mount_uploader :image, ImageUploader
  mount_uploader :video, VideoUploader
end
