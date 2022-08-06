var app = angular.module("hospitalApp");

app.factory('Specialty', ['$resource', function($resource) {
    return $resource('/api/specialties/:id.json', { id: '@id' });
}]);