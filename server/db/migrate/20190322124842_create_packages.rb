class CreatePackages < ActiveRecord::Migration[5.2]
  def change
    create_table :packages do |t|
      t.string :name
      t.string :authors, array: true
      t.string :uploaders, array: true
      t.string :url
      t.string :homepage
      t.string :repository
      t.text :about
      t.string :license
      t.integer :popularity
      t.integer :health
      t.integer :maintenance
      t.integer :overall
      t.string :published

      t.timestamps
    end
  end
end
