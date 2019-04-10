require 'rails_helper'

RSpec.describe Package, type: :model do

  before(:example) do
    ActiveJob::Base.queue_adapter = :test
  end

  describe Package do

    let(:package) { Package.create(name: 'image_picker') }

    context "when a package run crawl_begin" do
      it "have been enqueued" do
        package.process_begin!
        expect(PackageCrawlJob).to have_been_enqueued
      end
      it "have state init" do
        expect(package).to have_state(:init)
      end
    end

    context "when the job finish" do
      before(:example) do
        package.update! aasm_state: "processing"
        PackageCrawlJob.perform_now package
      end
      it "save result" do
        expect(package.name).not_to be_nil
        expect(package.version).not_to be_nil
        expect(package.pub_url).not_to be_nil
        expect(package.repository_url).not_to be_nil
        expect(package.homepage).not_to be_nil
        expect(package.about).not_to be_nil
        expect(package.license).not_to be_nil
      end
      it "have state pending" do
        expect(package).to have_state(:pending)
      end
    end
  end
end
