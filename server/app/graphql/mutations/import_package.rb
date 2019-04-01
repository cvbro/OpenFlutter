module Mutations
  class ImportPackage < GraphQL::Schema::RelayClassicMutation
    field :package, Types::PackageType, null: false

    argument :url, String, required: true

    def resolve(url:)
      item = PackageSpider.parse!(:pub_dartlang, url: url)
      record = Package.find_or_initialize_by name: item[:name]
      if record.update(item)
        {
          package: record,
        }
      else
        {
          errors: record.errors.full_messages
        }
      end
    rescue PackageSpider::NotFound
      raise GraphQL::ExecutionError, "NotFound"
    rescue Net::OpenTimeout
      raise GraphQL::ExecutionError, "Timeout"
    end

  end
end
