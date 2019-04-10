class RenameUrlColumnsOnPackage < ActiveRecord::Migration[5.2]
  def change
    rename_column :packages, :url, :pub_url
    rename_column :packages, :repository, :repository_url
  end
end
