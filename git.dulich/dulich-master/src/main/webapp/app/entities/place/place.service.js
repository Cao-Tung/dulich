(function() {
    'use strict';
    angular
        .module('dulichApp')
        .factory('Place', Place);

    Place.$inject = ['$resource'];

    function Place ($resource) {
        var resourceUrl =  'api/places/:id';

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
            'byregion': { //lấy tất cả các place có region_id là :region_id
                method: 'GET',
                url: 'api/places/name/:id',
                isArray: true,
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.createdDate = DateUtils.convertDateTimeFromServer(data.createdDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
