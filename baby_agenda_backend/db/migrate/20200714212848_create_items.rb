class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.string :minimum_age
      t.string :minimum_time_taken
      t.integer :user_id, foreign_key: true
      t.integer :activity_id, foreign_key: true
      t.timestamps
    end
  end
end
