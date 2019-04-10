module Types
  class QueryType < Types::BaseObject

    field :node, field: GraphQL::Relay::Node.field
    field :nodes, field: GraphQL::Relay::Node.plural_field
    field :viewer, type: Types::ViewerType, null: false

    def viewer
      {}
    end

  end
end
