var app = angular.module("hospitalApp");

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