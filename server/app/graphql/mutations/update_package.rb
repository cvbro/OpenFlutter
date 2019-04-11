module Mutations
  class UpdatePackage < GraphQL::Schema::RelayClassicMutation
    field :package, Types::PackageType, null: true
    field :errors, [String], null: true

    argument :id, ID, required: true, loads: Types::PackageType, as: :record
    argument :name, String, required: false
    argument :category_ids, [ID], required: false, loads: Types::CategoryType, as: :categories
    argument :image, Types::ImageType, required: false
    argument :video, Types::VideoType, required: false

    def resolve(record:, categories: [], name: nil, image: nil, video: nil)
      record.update name: name, categories: categories, image: image, video: video
      if record.save
        {
          package: record
        }
      else
        {
          errors: record.errors.full_messages
        }
      end
    end
  end
end
