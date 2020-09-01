class ItemsController < ApplicationController

   

    def show
        user = User.find(params[:user_id])
        item = user.items.find(params[:activity_id])
        render json: item
    end

    def create
        user  = User.find(params[:user_id])
        item = Item.create!(item_params)
        user.items << item
        render json: item
    end

    def destroy
        user  = User.find(params[:user_id])
        item = user.items.find(params[:id])
        item.delete
        render json: {
            message: "Sucessfully removed from agenda",
            status: 200
        }, status: 200
    end

    private

    def item_params
        params.require(:item).permit(:user_id, :name, :description, :upvotes, :downvotes,:minimum_age, :minimum_time_taken, :activity_id)
    end
end
