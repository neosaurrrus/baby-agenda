class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

    def show
        user = User.find(params[:id])
        render json: user
    end

    def create 
        user = User.create(user_params)
        render json: user
    end



    private

    def user_params
        params.require(:user).permit(:id, :name, :password, :baby_dob, :baby_name, :baby_points, :agenda_id)
    end
end
