(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PlaceDialogController', PlaceDialogController);

    PlaceDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Place', 'Post', 'Hotel', 'Region', 'Tour'];

    function PlaceDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Place, Post, Hotel, Region, Tour) {
        var vm = this;

        vm.place = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.posts = Post.query();
        vm.hotels = Hotel.query();
        vm.regions = Region.query();
        vm.tours = Tour.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.place.id !== null) {
                Place.update(vm.place, onSaveSuccess, onSaveError);
            } else {
                Place.save(vm.place, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dulichApp:placeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setAvatar = function ($file, place) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        place.avatar = base64Data;
                        place.avatarContentType = $file.type;
                    });
                });
            }
        };

    }
})();
