(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('RegionController', RegionController);

    RegionController.$inject = ['$scope', '$state', 'Region'];

    function RegionController ($scope, $state, Region) {
        var vm = this;

        vm.regions = [];

        loadAll();

        function loadAll() {
            Region.query(function(result) {
                vm.regions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
