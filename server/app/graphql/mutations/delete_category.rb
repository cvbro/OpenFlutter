module Mutations
  class DeleteCategory < GraphQL::Schema::RelayClassicMutation
    field :category, Types::CategoryType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      record = Category.find id
      record.destroy!
      {
        category: record
      }
    end
  end
end
