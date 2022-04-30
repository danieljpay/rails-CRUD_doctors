class AddSpecialtyToDoctors < ActiveRecord::Migration[7.0]
  def change
    add_reference :doctors, :specialty, null: true, foreign_key: true
  end
end
