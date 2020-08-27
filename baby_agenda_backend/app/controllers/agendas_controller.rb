class AgendasController < ApplicationController

    def index
        user = User.first
        agenda = user.agenda_activities
        render json: agenda
    end

    def show
        user = User.first
        agenda_item = user.agenda_activities.find(params[:id])
        render json: agenda_item
    end

    def create
        user  = User.first
        agenda_item = user.agenda_activities.push(Activity.find(params[:id]))
        render json: activity_item
    end

    def destroy
        user = User.first
        agenda = user.agenda_activities
        agenda = user.agenda_activities.find_by(agenda_activity_id:params[:id])
        agenda.delete(agenda_item)
        render json: agenda
    end
end
