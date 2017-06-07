(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state','places','Place', 'regions','postnews'];

    function HomeController ($scope, Principal, LoginService, $state, places, Place, regions, postnews) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.regions = regions;
        vm.place=places;
        vm.postnews = postnews;
        vm.region = [];
        vm.places = [];
        vm.pid =[];
        vm.idPlace = [];
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        

        // vm.choose = function(){
        //     Place.byregion({
        //         id: vm.pid
        //     }, onSuccess, onError);

        //     function onSuccess(data) {
        //         console.log(vm.pid);
        //         console.log(data);
        //         vm.places=data;
        //         // console.log(vm.sr);
        //     }

        //     function onError(error) {
        //         console.log("data");
        //     }
        //   }
         
        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }
    }
})();
