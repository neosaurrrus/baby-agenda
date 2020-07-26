class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.string :baby_name
      t.date :baby_dob
      t.integer :baby_points, :default => 0
      t.integer :agenda_id

      t.timestamps
    end
  end
end
