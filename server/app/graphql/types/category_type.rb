module Types
  class CategoryType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :level, Integer, null: false
    field :parent, CategoryType, null: true

    field :packages, [PackageType], null: false
  end
end
