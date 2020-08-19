class Agenda < ApplicationRecord
    attr_accessor :activities
    has_many :activities
    belongs_to :user

  
    def activities
        self.activities
    end


end