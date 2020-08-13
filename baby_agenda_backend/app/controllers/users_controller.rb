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
        session[:user_id] = 1
        render json: {
                    error: "No such user; check the submitted email address",
                    status: 400
                  }, status: 400
                end
     
       
        # if !session
        #     render json: ({name => "Guest"})
        # else
        #     user = User.find(session[:user_id])
        #     binding.pry
        #     if user.present?
        #         render json: user
        #     else
        #     render json: {
        #         error: "No such user; check the submitted email address",
        #         status: 400
        #       }, status: 400
        #     end
        # end
    # end

   



    private
 
    def user_params
        params.require(:user).permit(:id, :name, :password, :baby_dob, :baby_name, :baby_points, :agenda_id)
    end
end
