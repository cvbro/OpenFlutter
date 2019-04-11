module Mutations
  class CreatePackage < GraphQL::Schema::RelayClassicMutation
    field :package, Types::PackageType, null: true
    field :errors, [String], null: true

    argument :name, String, required: true
    argument :image, Types::ImageType, required: false
    argument :video, Types::VideoType, required: false
    argument :category_ids, [ID], required: false, loads: Types::CategoryType, as: :categories

    def resolve(name:, categories: [], video: nil, image: nil)
      record = Package.new name: name, categories: categories, image: image, video: video
      if record.process_begin!
        {
          package: record,
        }
      else
        {
          errors: record.errors.full_messages
        }
      end
    end
  end
end
