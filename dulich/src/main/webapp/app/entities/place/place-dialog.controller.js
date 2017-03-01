(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PlaceDialogController', PlaceDialogController);

    PlaceDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Place', 'Post', 'Hotel', 'Tour', 'Region'];

    function PlaceDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Place, Post, Hotel, Tour, Region) {
        var vm = this;

        vm.place = entity;
        vm.clear = clear;
        vm.save = save;
        vm.posts = Post.query();
        vm.hotels = Hotel.query();
        vm.tours = Tour.query();
        vm.regions = Region.query();

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


    }
})();
