class AddAasmStateToPackages < ActiveRecord::Migration[5.2]
  def change
    add_column :packages, :aasm_state, :string
    add_column :packages, :aasm_timestamps, :jsonb, default: {}
  end
end
