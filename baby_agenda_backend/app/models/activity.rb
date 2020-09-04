class Activity < ApplicationRecord
    belongs_to :user
    has_many :agenda_users, :class_name => :User

    def self.random_6 
        Activity.limit(6).order("RANDOM()")
    end
end