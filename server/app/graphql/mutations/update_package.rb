module Mutations
  class UpdatePackage < GraphQL::Schema::RelayClassicMutation

    field :package, Types::PackageType, null: false

    argument :id, ID, required: true, loads: Types::PackageType, as: :record
    argument :name, String, required: false
    argument :category_ids, [ID], required: false, loads: Types::CategoryType, as: :categories
    argument :image, Types::ImageType, required: false
    argument :video, Types::VideoType, required: false

    def resolve(record:, categories: [], name: nil, image: nil, video: nil)
      record.update name: name, categories: categories
      if record.save
        PackageUploadJob.perform_later record, image, video
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
