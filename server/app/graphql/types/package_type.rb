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

    field :image, ImageType, null: true
    field :video, VideoType, null: true

    field :categories, [CategoryType], null: false
    field :error_messages, [String], null: false
    field :status, String, null: false

    def status
      self.object.human_aasm_state
    end
  end
end
