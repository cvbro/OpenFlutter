module Mutations
  class UpdatePackage < GraphQL::Schema::RelayClassicMutation

    field :package, Types::PackageType, null: false

    argument :id, ID, required: true
    argument :image, Types::FileType, required: false
    argument :video, Types::FileType, required: false

    def resolve(id:, image: nil, video: nil)
      record = Package.find(id)
      record.image = image if image
      record.video = video if video
      record.save()
      {
        package: record
      }
    end
  end
end
