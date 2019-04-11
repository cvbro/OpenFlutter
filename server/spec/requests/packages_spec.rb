require 'rails_helper'

RSpec.describe OpenFlutterSchema, type: :request do
  let(:context) { {} }
  let(:variables) { {} }
  let(:ignore_errors) { false }
  let(:executed) {
    res = described_class.execute(
      query_string,
      context: context,
      variables: variables
    )
    if res["errors"] and not ignore_errors
      pp res.to_h
    end
    res
  }

  describe "#createPackage" do
    let(:query_string) do %|
    mutation {
      createPackage(input: {name: "image_picker"}){
        package{
          id
          name
          video
          image
        }
      }
    }|
    end

    context "when create a new package" do
      before(:example) do
        ActiveJob::Base.queue_adapter = :test
      end
      it "have 1 jobs been enqueued" do
        expect(executed["data"]["createPackage"]["package"]["name"]).to eq("image_picker")
        expect(PackageCrawlJob).to have_been_enqueued
      end
    end
  end
end
