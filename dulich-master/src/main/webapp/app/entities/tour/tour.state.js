(function() {
    'use strict';

    angular
        .module('dulichApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('tour', {
            parent: 'entity',
            url: '/tour',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dulichApp.tour.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tour/tours.html',
                    controller: 'TourController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('tour');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('tour-detail', {
            parent: 'entity',
            url: '/tour/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dulichApp.tour.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tour/tour-detail.html',
                    controller: 'TourDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('tour');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Tour', function($stateParams, Tour) {
                    return Tour.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'tour',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('tour-detail.edit', {
            parent: 'tour-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tour/tour-dialog.html',
                    controller: 'TourDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Tour', function(Tour) {
                            return Tour.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tour.new', {
            parent: 'tour',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tour/tour-dialog.html',
                    controller: 'TourDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nameCompany: null,
                                linkCompany: null,
                                avatar: null,
                                avatarContentType: null,
                                phone: null,
                                serviceTour: null,
                                price: null,
                                content: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('tour', null, { reload: 'tour' });
                }, function() {
                    $state.go('tour');
                });
            }]
        })
        .state('tour.edit', {
            parent: 'tour',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tour/tour-dialog.html',
                    controller: 'TourDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Tour', function(Tour) {
                            return Tour.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('tour', null, { reload: 'tour' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tour.delete', {
            parent: 'tour',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tour/tour-delete-dialog.html',
                    controller: 'TourDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Tour', function(Tour) {
                            return Tour.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('tour', null, { reload: 'tour' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
