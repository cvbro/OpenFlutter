module Mutations
  class DeletePackage < GraphQL::Schema::RelayClassicMutation
    field :packages, [Types::PackageType], null: true
    field :errors, [String], null: true

    argument :ids, [ID], required: true, loads: Types::PackageType, as: :records

    def resolve(records:)
      packages = []
      errors = []
      records.map do |record|
        if record.destroy
          packages << record
        else
          errors << record.errors.full_messages
        end
      end
      {
        packages: packages,
        errors: errors,
      }
    end
  end
end
