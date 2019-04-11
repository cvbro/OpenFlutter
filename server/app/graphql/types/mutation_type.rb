module Types
  class MutationType < Types::BaseObject
    field :deletePackage, mutation: Mutations::DeletePackage
    field :deleteCategory, mutation: Mutations::DeleteCategory
    field :updateCategory, mutation: Mutations::UpdateCategory
    field :createCategory, mutation: Mutations::CreateCategory
    field :updatePackage, mutation: Mutations::UpdatePackage
    field :createPackage, mutation: Mutations::CreatePackage
    field :updatePackageStatus, mutation: Mutations::UpdatePackageStatus
  end
end
