class ActivityController < ApplicationController
    def index
        activities = Activity.all
        render json: activities 
    end
end
