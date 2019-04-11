module Types
  class ViewerType < Types::BaseObject

    field :categories, type: CategoryType.connection_type, null: false

    field :packages, type: PackageType.connection_type, null: false do
      argument :category_id, ID, required: false
      argument :keyword, String, required: false
      argument :scope, String, required: false
    end

    def categories
      Category.roots
    end

    def packages(keyword: nil, category_id: nil, scope: nil)
      query = Package.left_joins(:categories)

      if scope == 'showing'
        query = query.showing
      end

      query = query.search_by_keyword(keyword) if keyword

      if category_id
        type_name, item_id = OpenFlutterSchema.decode_gid(category_id)
        query = query.where(categories: {id: item_id})
      end

      query.order(:name)
    end

  end
end
