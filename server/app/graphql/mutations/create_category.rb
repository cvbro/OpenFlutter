module Mutations
  class CreateCategory < GraphQL::Schema::RelayClassicMutation

    field :category, Types::CategoryType, null: false

    argument :name, String, required: true
    argument :parent_id, Integer, required: false

    def resolve(name:, parent_id: nil)
      record = Category.create! name: name
      if parent_id
        record.move_to_child_of Category.find(parent_id)
      end
      {
        category: record
      }
    end
  end
end
