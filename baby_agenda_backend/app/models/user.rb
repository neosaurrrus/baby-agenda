class User < ApplicationRecord
    has_secure_password
    # validates_confirmation_of :password
    has_many :activities, :foreign_key => :user_id
    has_many :agenda_activities, :class_name => :Activity

    has_many :activities, :class_name => "Activity"
    has_many :agenda_activities, :class_name => "Activity", :foreign_key => "agenda_activity_id"
end
