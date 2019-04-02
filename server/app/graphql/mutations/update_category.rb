module Mutations
  class UpdateCategory < GraphQL::Schema::RelayClassicMutation
    field :category, Types::CategoryType, null: false

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :parent_id, Integer, required: false

    def resolve(id:, name: nil, parent_id: nil)
      record = Category.find id
      record.name = name if name
      record.move_to_child_of(Category.find(parent_id)) if parent_id
      record.save!
      {
        category: record
      }
    end
  end
end
