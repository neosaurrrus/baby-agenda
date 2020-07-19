class CreateActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :activities do |t|
      t.string :name
      t.string :description
      t.string :minimum_age
      t.string :minimum_time_taken
      t.integer :upvotes, :default => 0
      t.integer :downvotes, :default => 0

      t.timestamps
    end
  end
end
