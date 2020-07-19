class ActivitiesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        activities = Activity.all
        render json: activities 
    end

    def show
        activity = Activity.find(params[:id])
        render json: activity
    end

    def create 
        activity = Activity.create(activity_params)
        render json: activity
    end

    def update
        activity = Activity.find(params[:id])
        activity.update(activity_params)
        render json: activity
    end


    private

    def activity_params
        params.require(:activity).permit(:name, :description, :minimum_age, :minimum_time_taken)
    end
end
