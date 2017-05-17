(function() {
    'use strict';

    angular
        .module('dulichApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('hotel', {
            parent: 'entity',
            url: '/hotel',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dulichApp.hotel.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/hotel/hotels.html',
                    controller: 'HotelController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('hotel');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('hotel-detail', {
            parent: 'entity',
            url: '/hotel/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dulichApp.hotel.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/hotel/hotel-detail.html',
                    controller: 'HotelDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('hotel');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Hotel', function($stateParams, Hotel) {
                    return Hotel.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'hotel',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('hotel-detail.edit', {
            parent: 'hotel-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hotel/hotel-dialog.html',
                    controller: 'HotelDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Hotel', function(Hotel) {
                            return Hotel.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('hotel.new', {
            parent: 'hotel',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hotel/hotel-dialog.html',
                    controller: 'HotelDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nameHotel: null,
                                avatar: null,
                                avatarContentType: null,
                                link: null,
                                price: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('hotel', null, { reload: 'hotel' });
                }, function() {
                    $state.go('hotel');
                });
            }]
        })
        .state('hotel.edit', {
            parent: 'hotel',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hotel/hotel-dialog.html',
                    controller: 'HotelDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Hotel', function(Hotel) {
                            return Hotel.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('hotel', null, { reload: 'hotel' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('hotel.delete', {
            parent: 'hotel',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hotel/hotel-delete-dialog.html',
                    controller: 'HotelDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Hotel', function(Hotel) {
                            return Hotel.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('hotel', null, { reload: 'hotel' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
