(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PostDialogController', PostDialogController);

    PostDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Post', 'Place'];

    function PostDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Post, Place) {
        var vm = this;

        vm.post = entity;
        vm.post.view = 0;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.places = Place.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.post.id !== null) {
                Post.update(vm.post, onSaveSuccess, onSaveError);
            } else {
                Post.save(vm.post, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dulichApp:postUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setAvatar = function ($file, post) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        post.avatar = base64Data;
                        post.avatarContentType = $file.type;
                    });
                });
            }
        };
        vm.datePickerOpenStatus.createDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
