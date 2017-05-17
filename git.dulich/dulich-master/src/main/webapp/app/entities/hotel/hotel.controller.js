(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('HotelController', HotelController);

    HotelController.$inject = ['$scope', '$state', 'DataUtils', 'Hotel'];

    function HotelController ($scope, $state, DataUtils, Hotel) {
        var vm = this;

        vm.hotels = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Hotel.query(function(result) {
                vm.hotels = result;
                vm.searchQuery = null;
            });
        }
    }
})();
