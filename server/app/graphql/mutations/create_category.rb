module Mutations
  class CreateCategory < GraphQL::Schema::RelayClassicMutation

    field :category, Types::CategoryType, null: true
    field :errors, [String], null: true

    argument :name, String, required: true
    argument :parent_id, Integer, required: false

    def resolve(name:, parent_id: nil)
      record = Category.new name: name, parent_id: parent_id
      if record.save
        {
          category: record
        }
      else
        {
          errors: record.errors.full_messages
        }
      end
    end
  end
end
