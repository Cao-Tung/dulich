(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('HotelDetailController', HotelDetailController);

    HotelDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Hotel', 'Place', 'Tour'];

    function HotelDetailController($scope, $rootScope, $stateParams, previousState, entity, Hotel, Place, Tour) {
        var vm = this;

        vm.hotel = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dulichApp:hotelUpdate', function(event, result) {
            vm.hotel = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
