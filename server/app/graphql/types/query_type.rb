module Types
  class QueryType < Types::BaseObject

    field :node, field: GraphQL::Relay::Node.field
    field :nodes, field: GraphQL::Relay::Node.plural_field

    def self.simple_field(*names, **options)
      names.each do |name|
        model_class = Object.const_get(name.to_s.singularize.camelcase)
        type_class = Object.const_get("Types::#{model_class}Type")
        default_field_options = { type: type_class.connection_type, null: false }
        field_options = default_field_options.merge(options)

        field(name, field_options) do
          yield if block_given?
        end

        define_method name do
          model_class.all
        end
      end
    end

    simple_field :packages, :categories

  end
end
