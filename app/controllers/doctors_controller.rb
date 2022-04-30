class DoctorsController < ApplicationController
  def index
    @doctors = Doctor.all
  end

  def new 
    @doctor = Doctor.new
  end

  def create
    @doctor = Doctor.new(doctor_params)
    if @doctor.save
      redirect_to doctors_path
      puts 'El doctor fue guardado'
    else
      render 'new'
      puts 'El doctor no pudo ser guardado'
    end
  end

  def edit
    @doctor = Doctor.find(params[:id])
  end

  def update
    @doctor = Doctor.find(params[:id])
    if @doctor.update(doctor_params)
      puts "El doctor fue actualizado"
      redirect_to doctors_path
    else
      render 'edit'
    end
  end

  def destroy
    Doctor.find(params[:id]).destroy
    puts 'El doctor fue eliminado'
    redirect_to doctors_path
  end

  private

  def doctor_params
    params.require(:doctor).permit(:name, :lastname, :age, :specialty_id)
  end
end
