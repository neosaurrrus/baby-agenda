class Activity < ApplicationRecord
    belongs_to :user
    has_many :agenda_users, :class_name => :User
end