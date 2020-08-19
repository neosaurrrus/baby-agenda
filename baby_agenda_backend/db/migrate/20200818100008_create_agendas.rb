class CreateAgendas < ActiveRecord::Migration[6.0]
  def change
    create_table :agendas do |t|
      t.integer :user_id, foreign_key: true
      t.integer :activity_id, foreign_key: true

      t.timestamps
    end
  end
end
