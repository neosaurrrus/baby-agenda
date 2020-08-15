class User < ApplicationRecord
    has_secure_password
    # validates_confirmation_of :password
    has_many :activities
    has_one :agenda
end
