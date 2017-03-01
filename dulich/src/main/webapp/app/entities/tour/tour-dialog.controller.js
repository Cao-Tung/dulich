(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('TourDialogController', TourDialogController);

    TourDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Tour', 'Hotel', 'Place'];

    function TourDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Tour, Hotel, Place) {
        var vm = this;

        vm.tour = entity;
        vm.clear = clear;
        vm.save = save;
        vm.hotels = Hotel.query();
        vm.places = Place.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.tour.id !== null) {
                Tour.update(vm.tour, onSaveSuccess, onSaveError);
            } else {
                Tour.save(vm.tour, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dulichApp:tourUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
