module Types
  class MutationType < Types::BaseObject
    field :importPackage, mutation: Mutations::ImportPackage
  end
end
