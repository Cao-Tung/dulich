(function() {
    'use strict';

    angular
        .module('dulichApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                // region: ['$stateParams','Region',function($stateParams,Region){
                //     return Region.get({id : $stateParams.id}).$promise;
                // }], // lấy ra các region theo id
                regions: ['$stateParams','Region',function($stateParams,Region){
                    return Region.query().$promise;
                }],
                places: ['$stateParams','Place',function($stateParams,Place){
                    return Place.query().$promise;
                }],
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('home');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
