class OpenFlutterSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
end
