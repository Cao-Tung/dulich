(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('HotelDetailController', HotelDetailController);

    HotelDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Hotel', 'Place', 'Tour'];

    function HotelDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Hotel, Place, Tour) {
        var vm = this;

        vm.hotel = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('dulichApp:hotelUpdate', function(event, result) {
            vm.hotel = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
