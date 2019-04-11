class AddErrorMessagesToPackage < ActiveRecord::Migration[5.2]
  def change
    add_column :packages, :error_messages, :string, array: true, default: []
  end
end
