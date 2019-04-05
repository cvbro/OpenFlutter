module Mutations
  class UpdatePackage < GraphQL::Schema::RelayClassicMutation

    field :package, Types::PackageType, null: false

    argument :id, ID, required: true, loads: Types::PackageType, as: :record
    argument :name, String, required: false
    argument :image, Types::FileType, required: false
    argument :video, Types::FileType, required: false

    def resolve(record:, name: nil, image: nil, video: nil)
      record.name = name if name
      record.image = image if image
      record.video = video if video
      record.save()
      {
        package: record
      }
    end
  end
end
