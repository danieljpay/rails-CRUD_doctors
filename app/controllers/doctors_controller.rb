class DoctorsController < ApplicationController
  def index
    @doctors = Doctor.all
  end

  def new 
    @doctor = Doctor.new
    @services = []
  end

  def create
    @doctor = Doctor.new(doctor_params)
    if @doctor.save
      redirect_to doctors_path
    else
      render 'new'
    end
  end

  def edit
    @doctor = Doctor.find(params[:id])
    @services = Service.all
  end

  def update
    @doctor = Doctor.find(params[:id])
    if @doctor.update(doctor_params)
      redirect_to doctors_path
    else
      render 'edit'
    end
  end

  def destroy
    Doctor.find(params[:id]).destroy
    redirect_to doctors_path
  end

  private

  def doctor_params
    params.require(:doctor).permit(:name, :lastname, :age, :specialty_id)
  end
end
