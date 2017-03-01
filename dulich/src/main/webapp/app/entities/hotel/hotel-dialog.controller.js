(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('HotelDialogController', HotelDialogController);

    HotelDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Hotel', 'Place', 'Tour'];

    function HotelDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Hotel, Place, Tour) {
        var vm = this;

        vm.hotel = entity;
        vm.clear = clear;
        vm.save = save;
        vm.places = Place.query();
        vm.tours = Tour.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.hotel.id !== null) {
                Hotel.update(vm.hotel, onSaveSuccess, onSaveError);
            } else {
                Hotel.save(vm.hotel, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dulichApp:hotelUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
