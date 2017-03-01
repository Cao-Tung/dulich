(function() {
    'use strict';

    angular
        .module('dulichApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('place', {
            parent: 'entity',
            url: '/place',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dulichApp.place.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/place/places.html',
                    controller: 'PlaceController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('place');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('place-detail', {
            parent: 'entity',
            url: '/place/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dulichApp.place.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/place/place-detail.html',
                    controller: 'PlaceDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('place');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Place', function($stateParams, Place) {
                    return Place.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'place',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('place-detail.edit', {
            parent: 'place-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/place/place-dialog.html',
                    controller: 'PlaceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Place', function(Place) {
                            return Place.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('place.new', {
            parent: 'place',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/place/place-dialog.html',
                    controller: 'PlaceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                namePlace: null,
                                avatar: null,
                                content: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('place', null, { reload: 'place' });
                }, function() {
                    $state.go('place');
                });
            }]
        })
        .state('place.edit', {
            parent: 'place',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/place/place-dialog.html',
                    controller: 'PlaceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Place', function(Place) {
                            return Place.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('place', null, { reload: 'place' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('place.delete', {
            parent: 'place',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/place/place-delete-dialog.html',
                    controller: 'PlaceDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Place', function(Place) {
                            return Place.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('place', null, { reload: 'place' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
