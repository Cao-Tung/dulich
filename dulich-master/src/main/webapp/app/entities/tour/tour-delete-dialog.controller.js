(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('TourDeleteController',TourDeleteController);

    TourDeleteController.$inject = ['$uibModalInstance', 'entity', 'Tour'];

    function TourDeleteController($uibModalInstance, entity, Tour) {
        var vm = this;

        vm.tour = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Tour.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
