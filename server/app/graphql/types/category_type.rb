module Types
  class CategoryType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :level, Integer, null: false
    field :parent, CategoryType, null: true

    field :packages, [PackageType], null: false
    field :children, [CategoryType], null: true

    def name
      if self.object.name
        "#{self.object.name_zh}(#{self.object.name})"
      else
        self.object.name_zh
      end
    end
  end
end
