class ActivitiesController < ApplicationController
  
    def index
        activities = Activity.all
        render json: activities 
    end

    def show
        activity = Activity.find(params[:id])
        render json: activity
    end

    def create 
        binding.pry
        activity = Activity.create!(activity_params)
        render json: activity
    end

    def update
        activity = Activity.find(params[:id])
        activity.update(activity_params)
        render json: activity
    end
    def destroy
        activity = Activity.find(params[:id])
        activity.delete
        render json: activity
    end


    private

    def activity_params
        params.require(:activity).permit(:id, :name, :description, :minimum_age, :minimum_time_taken, :user_id)
    end
end
