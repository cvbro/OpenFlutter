module Types
  class ViewerType < Types::BaseObject

    def self.simple_field(*names, **options, &block)
      names.each do |name|
        model_class = Object.const_get(name.to_s.singularize.camelcase)
        type_class = Object.const_get("Types::#{model_class}Type")
        default_field_options = { type: type_class.connection_type, null: false }
        field_options = default_field_options.merge(options)

        field(name, field_options) do
          yield self if block_given?
        end

        define_method name do |**kwargs|
          query = model_class
          query = query.search_by_keyword(kwargs[:keyword]) if kwargs[:keyword]
          query.all
        end
      end
    end

    simple_field :packages, :categories do |field|
      field.argument :keyword, String, required: false
    end

  end
end
