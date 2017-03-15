(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('RegionController', RegionController);

    RegionController.$inject = ['$scope', '$state', 'DataUtils', 'Region'];

    function RegionController ($scope, $state, DataUtils, Region) {
        var vm = this;

        vm.regions = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Region.query(function(result) {
                vm.regions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
