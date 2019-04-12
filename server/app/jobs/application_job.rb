class ApplicationJob < ActiveJob::Base
  queue_as :sidekiq
  self.logger = Logger.new(Rails.root.join('log', 'activejob.log'))
end
