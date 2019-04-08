require 'carrierwave/orm/activerecord'
class Package < ApplicationRecord
  include PgSearch
  include AASM
  
  has_many :package_categories
  has_many :categories, through: :package_categories

  mount_uploader :image, ImageUploader
  mount_uploader :video, VideoUploader
  validates :name, presence: true
  validates :name, uniqueness: true

  pg_search_scope :search_by_keyword, against: :name

  aasm do
    state :init, initial: true
    state :processing
    state :pending
    state :showing
    state :hiding

    event :process_begin do
      transitions from: [:init, :pending], to: :processing, success: :run_process do
        guard do
          self.name.present?
        end
      end
    end

    event :process_finish do
      transitions from: :processing, to: :pending do
        guard do
          self.name.present?
        end
      end
    end

    event :publish do
      transitions from: :pending, to: :showing
    end

    after_all_transitions :refresh_aasm_timestamps
  end

  def refresh_aasm_timestamps
    self.aasm_timestamps[aasm.current_event] = DateTime.now
  end

  def run_process
    PackageCrawlJob.perform_later(self) if self.name and self.id
  end

  def self.url_for(name)
    "https://pub.flutter-io.cn/packages/#{name}" if name
  end
end
