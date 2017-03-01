(function() {
    'use strict';
    angular
        .module('dulichApp')
        .factory('Hotel', Hotel);

    Hotel.$inject = ['$resource'];

    function Hotel ($resource) {
        var resourceUrl =  'api/hotels/:id';

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
            'update': { method:'PUT' }
        });
    }
})();
