(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('TourDialogController', TourDialogController);

    TourDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Tour', 'Place', 'Hotel'];

    function TourDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Tour, Place, Hotel) {
        var vm = this;

        vm.tour = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.places = Place.query();
        vm.hotels = Hotel.query();

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


        vm.setAvatar = function ($file, tour) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        tour.avatar = base64Data;
                        tour.avatarContentType = $file.type;
                    });
                });
            }
        };

    }
})();
