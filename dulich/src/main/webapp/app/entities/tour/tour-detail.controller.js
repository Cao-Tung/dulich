(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('TourDetailController', TourDetailController);

    TourDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Tour', 'Hotel', 'Place'];

    function TourDetailController($scope, $rootScope, $stateParams, previousState, entity, Tour, Hotel, Place) {
        var vm = this;

        vm.tour = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dulichApp:tourUpdate', function(event, result) {
            vm.tour = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
