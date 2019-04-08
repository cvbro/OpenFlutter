module Mutations
  class CreateCategory < GraphQL::Schema::RelayClassicMutation

    field :category, Types::CategoryType, null: false

    argument :name, String, required: true
    argument :parent_id, Integer, required: false

    def resolve(name:, parent_id: nil)
      record = Category.create! name: name, parent_id: parent_id
      {
        category: record
      }
    end
  end
end
