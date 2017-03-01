'use strict';

describe('Controller Tests', function() {

    describe('Place Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockPlace, MockPost, MockHotel, MockTour, MockRegion;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockPlace = jasmine.createSpy('MockPlace');
            MockPost = jasmine.createSpy('MockPost');
            MockHotel = jasmine.createSpy('MockHotel');
            MockTour = jasmine.createSpy('MockTour');
            MockRegion = jasmine.createSpy('MockRegion');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Place': MockPlace,
                'Post': MockPost,
                'Hotel': MockHotel,
                'Tour': MockTour,
                'Region': MockRegion
            };
            createController = function() {
                $injector.get('$controller')("PlaceDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dulichApp:placeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
