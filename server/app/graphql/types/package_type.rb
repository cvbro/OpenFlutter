module Types
  class PackageType < Types::BaseObject
    global_id_field :id
    field :name, String, null: true
    field :version, String, null: true
    field :pub_url, String, null: true
    field :repository_url, String, null: true
    field :about, String, null: true
    field :license, String, null: true
    field :popularity, Integer, null: true
    field :health, Integer, null: true
    field :maintenance, Integer, null: true
    field :overall, Integer, null: true
    field :publisahed_at, String, null: true

    field :image, FileType, null: true
    field :video, FileType, null: true
  end
end
