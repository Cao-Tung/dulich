(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state','$scope' ,'Auth', 'Principal', 'ProfileService', 'LoginService','Place','Region'];

    function NavbarController ($state, $scope,Auth, Principal, ProfileService, LoginService,Place,Region) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;
        vm.searchtitle = function(){
         
          $state.go('place-search',{title : $scope.title});
          console.log($scope.title);
        }
        vm.places=Place.query();
        vm.regions=Region.query();
        function login() {
            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }
    }
})();
