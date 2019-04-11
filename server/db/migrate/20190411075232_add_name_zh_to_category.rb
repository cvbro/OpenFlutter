class AddNameZhToCategory < ActiveRecord::Migration[5.2]
  def change
    add_column :categories, :name_zh, :string
  end
end
