class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token


    def create 
        user =  User.find_by(username: params[:username])
        user = user.try(:authenticate, params[:password])
        render json: user
    end

    def destroy
        if session[:user_id]
            session.delete :user_id
        end
        render json: "hi"
    end


    private

end
