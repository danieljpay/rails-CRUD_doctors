var app = angular.module("hospitalApp");

app.factory('Doctor', ['$resource', function($resource) {
    return $resource('/api/doctors/:id.json', { id: '@id' }, {
        update: { method: 'PATCH' },
        delete: {
            action: 'destroy',
            method: 'DELETE',
            url: '/api/doctors/:id.json',
            params: {
                id: '@id'
            }
        }
    });
}]);

app.factory('Specialty', ['$resource', function($resource) {
    return $resource('/api/specialties/:id.json', { id: '@id' });
}]);

app.factory('Service', ['$resource', function($resource) {
    return $resource('/api/services/:id.json', { id: '@id' }, {
        update: { method: 'PATCH' },
        delete: {
            action: 'destroy',
            method: 'DELETE',
            url: '/api/services/:id.json',
            params: {
                id: '@id'
            }
        }
    });
}]);