module Api
    class SpecialtiesController < ApplicationController
        respond_to :json

        def index
            respond_with Specialty.all
        end

    end
end