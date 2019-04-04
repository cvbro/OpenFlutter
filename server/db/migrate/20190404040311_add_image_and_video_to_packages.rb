class AddImageAndVideoToPackages < ActiveRecord::Migration[5.2]
  def change
    add_column :packages, :image, :string
    add_column :packages, :video, :string
  end
end
