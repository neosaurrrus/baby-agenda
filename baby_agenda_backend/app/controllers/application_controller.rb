class ApplicationController < ActionController::Base
  
before_action :set_user
   
    
    def check_if_belongs_to_user(instance)
        instance.user_id == current_user.id
    end

    def current_user
        user = "none"
        if session[:id].present?
            user = User.find(session[:id]) 
        end
        user
        
    end
    private

    def set_user
        cookies[:username] = current_user || 'Guest'
        puts cookies[:username]
    end
end
