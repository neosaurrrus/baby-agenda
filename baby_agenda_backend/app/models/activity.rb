class Activity < ApplicationRecord
    has_many :users, :through => :agendas
    belongs_to :user
    
end
