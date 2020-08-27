class CreateItemsUsersJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :items, :users
 
    
    
  end
end
