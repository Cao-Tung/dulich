'use strict';

describe('Controller Tests', function() {

    describe('Tour Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTour, MockHotel, MockPlace;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTour = jasmine.createSpy('MockTour');
            MockHotel = jasmine.createSpy('MockHotel');
            MockPlace = jasmine.createSpy('MockPlace');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Tour': MockTour,
                'Hotel': MockHotel,
                'Place': MockPlace
            };
            createController = function() {
                $injector.get('$controller')("TourDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dulichApp:tourUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
