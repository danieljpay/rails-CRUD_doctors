module Api
    class ServicesController < ApplicationController
        before_action :set_service, only: [:update, :destroy]
        respond_to :json

        def index
            respond_with Service.all
        end

        def create
            service = Service.new(service_params)
            if service.save
                respond_with :api, service, status: :ok, location: api_services_url
            else
                render json: { errors: services.errors.full_messages }, status: :unprocessable_entity
            end
        end

        def update
            if @service.update(service_params)
                respond_with :api, @service, status: :ok, location: api_services_url(@service)
            else
                render json: { errors: @service.error.full_messages }, status: :unprocessable_entity
            end
        end

        def destroy
            @service.destroy
            head :ok
        end

        private

        def service_params
            params.require(:service).permit(:name, :price, :doctor_id)
        end

        def set_service
            @service = Service.find(params[:id])
        end

    end
end