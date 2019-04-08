module Mutations
  class UpdateCategory < GraphQL::Schema::RelayClassicMutation
    field :category, Types::CategoryType, null: false

    argument :id, ID, required: true
    argument :name, String, required: true
    argument :parent_id, Integer, required: false

    def resolve(id:, name:, parent_id: nil)
      record = Category.find id
      record.update name: name, parent_id: parent_id
      {
        category: record
      }
    end
  end
end
