class ApplicationController < ActionController::API
  
    def welcome
    end

    def require_logged_in
        return redirect_to new_session_url unless current_user
    end

    def current_user
        User.find_by(id:session[:user_id])
    end
    
    def check_if_belongs_to_user(instance)
        return redirect_back fallback_location: "/", alert: "You are not authorised to do this" unless instance.user_id == current_user.id
    end

    
    
end
