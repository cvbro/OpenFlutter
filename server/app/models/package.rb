require 'carrierwave/orm/activerecord'
class Package < ApplicationRecord
  include PgSearch
  include AASM
  mount_uploader :image, ImageUploader
  mount_uploader :video, VideoUploader

  pg_search_scope :search_by_keyword, against: :name

  aasm do
    state :init, initial: true
    state :processing
    state :pending
    state :showing
    state :hiding

    event :begin do
      transitions from: :init, to: :processing
    end

    event :finish do
      transitions from: :processing, to: :pending
    end

    event :publish do
      transitions from: :pending, to: :showing
    end
    after_all_transitions :refresh_aasm_timestamps
  end



  def refresh_aasm_timestamps
    self.aasm_timestamps[aasm.current_event] = DateTime.now
  end
end
