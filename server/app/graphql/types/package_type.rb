module Types
  class PackageType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :pub_url, String, null: true
    field :repository_url, String, null: true
    field :about, String, null: true
    field :license, String, null: true
    field :popularity, Integer, null: true
    field :health, Integer, null: true
    field :maintenance, Integer, null: true
    field :overall, Integer, null: true
    field :publisahed_at, String, null: true
  end
end
