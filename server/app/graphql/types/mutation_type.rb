module Types
  class MutationType < Types::BaseObject
    field :updatePackage, mutation: Mutations::UpdatePackage
    field :importPackage, mutation: Mutations::ImportPackage
  end
end
