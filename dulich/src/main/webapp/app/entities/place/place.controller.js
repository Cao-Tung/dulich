(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PlaceController', PlaceController);

    PlaceController.$inject = ['$scope', '$state', 'Place'];

    function PlaceController ($scope, $state, Place) {
        var vm = this;

        vm.places = [];

        loadAll();

        function loadAll() {
            Place.query(function(result) {
                vm.places = result;
                vm.searchQuery = null;
            });
        }
    }
})();
