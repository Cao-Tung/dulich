(function() {
    'use strict';
    angular
        .module('dulichApp')
        .factory('Tour', Tour);

    Tour.$inject = ['$resource'];

    function Tour ($resource) {
        var resourceUrl =  'api/tours/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' },
            'byplace': {
                method: 'GET',
                url: 'api/tours/place/:id',
                isArray: true,
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            }
        });
    }
})();
