module Mutations
  class UpdatePackage < GraphQL::Schema::RelayClassicMutation

    field :package, Types::PackageType, null: false

    argument :id, ID, required: true
    argument :image, Types::FileType, required: false

    def resolve(id:, image:, video: nil)
      record = Package.find(id)
      record.image = image
      record.video = video
      record.save()
      {
        package: record
      }
    end
  end
end
