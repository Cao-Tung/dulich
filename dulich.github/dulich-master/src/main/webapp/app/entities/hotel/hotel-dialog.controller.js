(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('HotelDialogController', HotelDialogController);

    HotelDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Hotel', 'Place', 'Tour'];

    function HotelDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Hotel, Place, Tour) {
        var vm = this;

        vm.hotel = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
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


        vm.setAvatar = function ($file, hotel) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        hotel.avatar = base64Data;
                        hotel.avatarContentType = $file.type;
                    });
                });
            }
        };

    }
})();
