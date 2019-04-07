module Mutations
  class CreatePackage < GraphQL::Schema::RelayClassicMutation
    field :package, Types::PackageType, null: false

    argument :name, String, required: true
    argument :image, String, required: false
    argument :video, String, required: false

    def resolve(name:, video: nil, image: nil)
      record = Package.new name: name
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
