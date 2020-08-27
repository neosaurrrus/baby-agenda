class User < ApplicationRecord
    has_secure_password
    attr_reader :agenda

    has_many :activities, :class_name => "Activity"
    has_many :agenda_activities, :class_name => "Activity", :foreign_key => "agenda_activity_id"

    def initialize_agenda
        self.agenda = Array.new
    end

  
end
