(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('TourController', TourController);

    TourController.$inject = ['$scope', '$state', 'Tour'];

    function TourController ($scope, $state, Tour) {
        var vm = this;

        vm.tours = [];

        loadAll();

        function loadAll() {
            Tour.query(function(result) {
                vm.tours = result;
                vm.searchQuery = null;
            });
        }
    }
})();
