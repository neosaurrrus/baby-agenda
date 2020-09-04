class SessionsController < ApplicationController

  def create

      user = User.find_by(name: params[:name])
      user = user.try(:authenticate, params[:password])
      if user
        
        session[:user_id] = user.id
        render json: user
      end 
      

  end

  def destroy
    if session[:user_id] 
      session.delete :user_id 
    end
    render json: session
  end

  def index
  

    if !session[:user_id]
        render json: {
            error: "Guest User",
            status: 200
            }, status: 200
    else
        user = User.find(session[:user_id])
        render json: user
    end
rescue ActiveRecord::RecordNotFound
    render json: {
        error: "No user found, which is odd",
        status: 404
    }, status: 404

end
end
