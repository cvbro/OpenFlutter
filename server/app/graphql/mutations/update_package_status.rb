module Mutations
  class UpdatePackageStatus < GraphQL::Schema::RelayClassicMutation
    field :packages, [Types::PackageType], null: true
    field :errors, [String], null: true

    argument :ids, [ID], required: true, loads: Types::PackageType, as: :records
    argument :status, String, required: true

    def resolve(records:, status:)
      packages = []
      errors = []
      records.map do |record|
        if record.aasm.fire!(status.to_sym)
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
