(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PlaceController', PlaceController);

    PlaceController.$inject = ['$scope', '$state', 'DataUtils', 'Place'];

    function PlaceController ($scope, $state, DataUtils, Place) {
        var vm = this;

        vm.places = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Place.query(function(result) {
                vm.places = result;
                vm.searchQuery = null;
            });
        }
    }
})();
