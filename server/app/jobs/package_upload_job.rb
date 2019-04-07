class PackageUploadJob < ApplicationJob
  queue_as :default

  def perform(record:, image: nil, vidoe: nil)
    record.image = image
    record.video = video
    record.save
  end

end
