class Doctor < ApplicationRecord
    has_many :services
    has_one :specialty
end
