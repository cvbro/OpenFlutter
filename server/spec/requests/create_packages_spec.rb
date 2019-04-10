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
    let(:category) { Category.create(name: 'example') }
    let(:category_id) { described_class.id_from_object(category, Category, {}) }
    let(:variables) { {category_ids: [category_id]} }
    let(:query_string) do %|
    mutation($category_ids: [ID!]){
      createPackage(input: {name: "image_picker", categoryIds: $category_ids}){
        package{
          id
          name
          video
          image
          categories{
            name
          }
        }
      }
    }|
    end

    context "when create a new package" do
      it "have 2 jobs been enqueued" do
        expect(executed["data"]["createPackage"]["package"]["name"]).to eq("image_picker")
        expect(PackageUploadJob).to have_been_enqueued
        expect(PackageCrawlJob).to have_been_enqueued
      end
      it "have catrgory" do
        expect(executed["data"]["createPackage"]["package"]["categories"][0]["name"]).to eq(category.name)
      end
    end
  end
end
