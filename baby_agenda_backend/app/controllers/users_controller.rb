class UsersController < ApplicationController
    
    def show
        user = User.find(params[:id])

        agenda = user.items
    
        if user 
            render json: agenda
        end
    end

    def create 
        user = User.create!(user_params)
        if user.save
            Agenda.create!(user_id: user.id)
            session[:user_id] = user.id
            render json: user
        end
    end


    private
 
    def user_params
        params.require(:user).permit(:id, :name, :password, :baby_dob, :baby_name, :baby_points, :agenda_id)
    end
end
