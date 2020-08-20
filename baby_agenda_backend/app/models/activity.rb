class Activity < ApplicationRecord
    has_many :users, through: agenda
    belongs_to :user
    
end
