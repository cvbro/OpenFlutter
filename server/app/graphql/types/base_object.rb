module Types
  class BaseObject < GraphQL::Schema::Object

    def self.inherited(base)
      super
      unless [Types::MutationType, Types::QueryType, Types::ViewerType].include?(base)
        base.global_id_field :id
        base.implements GraphQL::Relay::Node.interface
      end
    end
  end

end
