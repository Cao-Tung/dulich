(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('TourDetailController', TourDetailController);

    TourDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Tour', 'Place', 'Hotel'];

    function TourDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Tour, Place, Hotel) {
        var vm = this;

        vm.tour = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('dulichApp:tourUpdate', function(event, result) {
            vm.tour = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
