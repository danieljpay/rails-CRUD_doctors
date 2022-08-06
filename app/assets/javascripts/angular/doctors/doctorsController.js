var app = angular.module('hospitalApp');

app.controller('doctorsController', ['$scope', 'Doctor', 'Specialty', 'Service', function($scope, Doctor, Specialty, Service) {
    $scope.doctors = Doctor.query();
    $scope.specialties = Specialty.query();
    $scope.services = Service.query();
    $scope.localServices = [];
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

        console.log($scope.doctors);

        $scope.saveServices();

        console.log($scope.localServices);

        $scope.doctor = {};
        $scope.localServices = [];
    }

    $scope.saveServices = function() {
        for (let i = 0; i < $scope.localServices.length; i++) {
            $scope.localServices[i].doctor_id = $scope.doctors[$scope.doctors.length - 1].id + 1; //el +1 no debería ir pero no se actualiza el array de doctores
            Service.save($scope.localServices[i],
                function(response, _headers) {
                    $scope.services.push(response);
                },
                function(response) {
                    alert('Errors' + response.data.errors.join('. '));
                }
            );
        }
    }

    $scope.addService = function() {
        $scope.localServices.push($scope.service);
        $scope.service = {};
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
        $scope.editingServices = [];

        for (let i = 0; i < $scope.services.length; i++) {
            if ($scope.services[i].doctor_id == $scope.editing.id) {
                $scope.editingServices.push($scope.services[i]);
            }
        }
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

        if ($scope.editingServices.length > 0) {
            for (let i = 0; i < $scope.editingServices.length; i++) {
                Service.update($scope.editingServices[i],
                    function(response, _headers) {
                        for (let j = 0; j < $scope.services.length; j++) {
                            if ($scope.services[j].doctor_id == $scope.editing.id) {
                                $scope.services[j] = $scope.editingServices[i];
                            }
                        }
                        //$scope.hideForm();
                    },
                    function(response) {
                        alert('Errors: ' + response.data.errors.join('. '));
                    }
                )
            }
        }

    }

    $scope.destroyDoctor = function(doctor, index) {

        //destroy services
        for (let i = 0; i < $scope.services.length; i++) {
            if ($scope.services[i].doctor_id == doctor.id) {
                Service.delete($scope.services[i],
                    function(response, _headers) {
                        $scope.services.splice(index, 1);
                    }
                )
            }
        }

        Doctor.delete(doctor,
            function(response, _headers) {
                $scope.doctors.splice(index, 1);
            }
        );
    }

    $scope.destroyService = function(service, index) {
        Service.delete(service,
            function(response, _headers) {
                $scope.services.splice(index, 1);
                $scope.editingServices.splice(index, 1);
            })
    }
}])