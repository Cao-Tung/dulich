'use strict';

describe('Controller Tests', function() {

    describe('Place Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockPlace, MockPost, MockHotel, MockRegion, MockTour;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockPlace = jasmine.createSpy('MockPlace');
            MockPost = jasmine.createSpy('MockPost');
            MockHotel = jasmine.createSpy('MockHotel');
            MockRegion = jasmine.createSpy('MockRegion');
            MockTour = jasmine.createSpy('MockTour');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Place': MockPlace,
                'Post': MockPost,
                'Hotel': MockHotel,
                'Region': MockRegion,
                'Tour': MockTour
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
