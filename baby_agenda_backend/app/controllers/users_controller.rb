class UsersController < ApplicationController
    

    # def show
    #     user = User.find(params[:id])
    #     if user 
    #         render json: user
    #     end
    # end

    def create 
        user = User.create(user_params)
        if user.save
            render json: user
        end
        render json: user
        

    end

    def current_user
        user = User.find_by(id:session[:user_id])
        if user
            render json: user
        else
        #why is this sending out guest all the time???
        render json: user
        end
    end

   



    private
 
    def user_params
        params.require(:user).permit(:id, :name, :password, :baby_dob, :baby_name, :baby_points, :agenda_id)
    end
end
