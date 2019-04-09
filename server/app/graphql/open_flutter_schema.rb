class OpenFlutterSchema < GraphQL::Schema
  default_max_page_size 10
  mutation(Types::MutationType)
  query(Types::QueryType)

  def self.decode_gid(id)
    GraphQL::Schema::UniqueWithinType.decode(id)
  end

  def self.id_from_object(object, type_definition, query_ctx)
    GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  end

  def self.object_from_id(id, query_ctx)
    type_name, item_id = self.decode_gid(id)
    Object.const_get(type_name).find(item_id)
  end

  def self.resolve_type(type, obj, ctx)
    case obj
    when Package
      Types::PackageType
    when Category
      Types::CategoryType
    else
      raise("Unexpected object: #{obj}")
    end
  end

end
