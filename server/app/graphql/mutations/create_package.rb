module Mutations
  class CreatePackage < GraphQL::Schema::RelayClassicMutation
    field :package, Types::PackageType, null: false

    argument :name, String, required: true
    argument :image, String, required: false
    argument :video, String, required: false
    argument :category_ids, [ID], required: false, loads: Types::CategoryType, as: :categories

    def resolve(name:, categories: [], video: nil, image: nil)
      record = Package.new name: name, categories: categories
      if record.process_begin!
        PackageUploadJob.perform_later record, image, video
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
