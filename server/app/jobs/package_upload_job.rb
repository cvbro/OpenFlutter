class PackageUploadJob < ApplicationJob
  queue_as :default

  def perform(record:, image: nil, video: nil)
    record.image = image if image
    record.video = video if video
    record.save
  end

end
