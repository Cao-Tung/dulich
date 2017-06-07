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
        .state('place-place', {
            parent: 'app',
            url: '/place-place/{id}',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/place/place-place.html',
                    controller: 'PlacePlaceController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Place', function($stateParams, Place) {
                    return Place.get({id : $stateParams.id}).$promise;
                }],// lấy ra các place theo id 
                posts: ['entity', 'Post', function(entity, Post) {
                    return Post.byplace({id : entity.id}).$promise;
                }],// lấy ra các post theo place id
                postsview: ['Post',function(Post){
                    return Post.viewall().$promise;
                }], // lấy ra tất cả các post được sxep bởi view
                
                // placeOfRegion: ['Place','regions', function(Place,regions){
                //     return Place.byregion({id : regions.id}).$promise;
                // }],// lấy ra các place theo region_id
               


                tours: ['entity', 'Tour', function(entity,Tour) {
                    return Tour.byplace({id : entity.id}).$promise;
                }],
                hotels: ['entity', 'Hotel',function(entity,Hotel) {
                    return Hotel.byplace({id : entity.id}).$promise;
                }],
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('home');
                    return $translate.refresh();
                }]
            }
        })
        .state('place-search', {
            parent: 'app',
            url: '/place-search/{title}',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/place/place-search.html',
                    controller: 'PlaceSearchController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
               
                postsearch: ['$stateParams','Post', function($stateParams,Post){
                  return Post.search({title : $stateParams.title}).$promise;
                }],
                postnew: ['Post', function(Post){
                  return Post.newbydate().$promise;
                }],
                postsview: ['Post',function(Post){
                    return Post.viewall().$promise;
                }],



                // places: ['Place', function(Place){
                //   return Place.query().$promise;
                // }],
                // tours: ['entity', 'Tour', function(entity,Tour) {
                //     return Tour.byplace({id : entity.id}).$promise;
                // }],
                // hotels: ['entity', 'Hotel',function(entity,Hotel) {
                //     return Hotel.byplace({id : entity.id}).$promise;
                // }],
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('home');
                    return $translate.refresh();
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
                                avatarContentType: null,
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
