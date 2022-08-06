module Api
  class DoctorsController < ApplicationController
    before_action :set_doctor, only: [:update, :destroy]
    respond_to :json

    def index  
      respond_with Doctor.all
    end

    def create
      doctor = Doctor.new(doctor_params)
      if doctor.save
        respond_with  :api, doctor, status: :ok, location: api_doctors_url
      else
        render json: { errors: doctor.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @doctor.update(doctor_params)
        respond_with :api, @doctor, status: :ok, location: api_doctor_url(@doctor)
      else
        render json: { errors: @doctor.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @doctor.destroy
      head :ok
    end

    private

    def doctor_params
      params.require(:doctor).permit(:name, :lastname, :age, :specialty_id)
    end

    def set_doctor
      @doctor = Doctor.find(params[:id])
    end
    
  end
end
