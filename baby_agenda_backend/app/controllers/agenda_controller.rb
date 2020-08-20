class AgendaController < ApplicationController
      def show
        agendas = Agenda.find(params[:id])
        render json: agendas
    end

    def create 
        agenda = Agenda.create(activity_params)
        render json: agenda
    end

    def update
        agenda = Agenda.find(params[:id])
        agenda.update(agenda_params)
        render json: agenda
    end
    def destroy
        agenda = Agenda.find(params[:id])
        agenda.delete
        render json: agenda
    end


    private

    def agenda_params
        params.require(:activity).permit(:user_id, :activity_id)
    end
end
