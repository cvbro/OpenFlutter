module Types
  class QueryType < Types::BaseObject

    field :packages, [PackageType], null: true

    field :package, PackageType, null: true do
      argument :name, String, required: true
    end

    field :categories, [CategoryType], null: true



    def categories
      Category.all
    end

    def packages
      Package.all
    end

    def package(name:)
      Package.find_by!(name: name)
    end
  end
end
