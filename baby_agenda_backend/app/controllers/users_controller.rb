class UsersController < ApplicationController
    

    # def show
    #     user = User.find(params[:id])
    #     if user 
    #         render json: user
    #     end
    # end

    def create 
        user = User.create!(user_params)
        if user.save
            session[:user_id] = user.id
            render json: user
        end

    end

    def current_user
        # session[:user_id] = 1
        
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

   



    private
 
    def user_params
        params.require(:user).permit(:id, :name, :password, :baby_dob, :baby_name, :baby_points, :agenda_id)
    end
end
