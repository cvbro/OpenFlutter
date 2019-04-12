class ApplicationJob < ActiveJob::Base
  queue_as :sidekiq
end
