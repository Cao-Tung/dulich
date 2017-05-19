(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('HotelDeleteController',HotelDeleteController);

    HotelDeleteController.$inject = ['$uibModalInstance', 'entity', 'Hotel'];

    function HotelDeleteController($uibModalInstance, entity, Hotel) {
        var vm = this;

        vm.hotel = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Hotel.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
