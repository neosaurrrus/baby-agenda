class User < ApplicationRecord
    has_secure_password

    has_many :activities, :class_name => "Activity"
    has_and_belongs_to_many :items
  
  
end
