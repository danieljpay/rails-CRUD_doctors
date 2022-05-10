var app = angular.module('hospitalApp');

app.controller('doctorsController', ['$scope', 'Doctor', 'Specialty', function($scope, Doctor, Specialty) {
    $scope.doctors = Doctor.query();
    $scope.specialties = Specialty.query();
    $scope.editing = {};

    $scope.addDoctor = function() {

        Doctor.save($scope.doctor,
            function(response, _headers) {
                $scope.doctors.push(response);
            },
            function(response) {
                alert('Errors' + response.data.errors.join('. '));
            }
        );

        $scope.doctor = {};
    }

    $scope.hideForm = function() {
        $scope.editing = {};
    }

    $scope.toggleForm = function(doctor) {
        if (doctor.id === $scope.editing.id) {
            return 'form';
        } else {
            return 'row';
        }
    }

    $scope.editDoctor = function(doctor) {
        $scope.editing = angular.copy(doctor);
    }

    $scope.updateDoctor = function(index) {
        Doctor.update($scope.editing,
            function(response, _headers) {
                $scope.doctors[index] = angular.copy($scope.editing);
                $scope.hideForm();
            },
            function(response) {
                alert('Errors: ' + response.data.errors.join('. '));
            }
        );
    }

    $scope.destroyDoctor = function(doctor, index) {
        Doctor.delete(doctor,
            function(response, _headers) {
                $scope.doctors.splice(index, 1);
            }
        );
    }
}])