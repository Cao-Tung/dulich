(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('TourController', TourController);

    TourController.$inject = ['$scope', '$state', 'DataUtils', 'Tour'];

    function TourController ($scope, $state, DataUtils, Tour) {
        var vm = this;

        vm.tours = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Tour.query(function(result) {
                vm.tours = result;
                vm.searchQuery = null;
            });
        }
    }
})();
