class SessionsController < ApplicationController

  def create
      user = User.find_by(username: params[:name])
      user = user.try(:authenticate, params[:password])

      if user.save
        session[:user_id] = user.id
      end 
      render json: session
  end

  def destroy
    if session[:user_id] 
      session.delete :user_id 
    end
    render json: session
  end
end
