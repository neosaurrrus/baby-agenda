class UsersController < ApplicationController
    

    def show
        user = User.find(params[:id])
        render json: user
    end

    def create 
        user = User.create(user_params)
        if user.save
            session[:user_id] = user.id
        end
        
    end

    def current_user
        user = User.find_by(id:session[:user_id])
        #why is this sending out guest all the time???
        render json: {user: user || "guest"}
    end



    private

    def user_params
        params.require(:user).permit(:id, :name, :password, :baby_dob, :baby_name, :baby_points, :agenda_id)
    end
end
