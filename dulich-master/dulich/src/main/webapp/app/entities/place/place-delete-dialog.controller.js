(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PlaceDeleteController',PlaceDeleteController);

    PlaceDeleteController.$inject = ['$uibModalInstance', 'entity', 'Place'];

    function PlaceDeleteController($uibModalInstance, entity, Place) {
        var vm = this;

        vm.place = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Place.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
