module Types
  class MutationType < Types::BaseObject
    field :deleteCategory, mutation: Mutations::DeleteCategory
    field :updateCategory, mutation: Mutations::UpdateCategory
    field :createCategory, mutation: Mutations::CreateCategory
    field :updatePackage, mutation: Mutations::UpdatePackage
    field :importPackage, mutation: Mutations::ImportPackage
  end
end
