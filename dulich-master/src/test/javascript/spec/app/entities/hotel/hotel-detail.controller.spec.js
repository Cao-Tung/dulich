'use strict';

describe('Controller Tests', function() {

    describe('Hotel Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockHotel, MockPlace, MockTour;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockHotel = jasmine.createSpy('MockHotel');
            MockPlace = jasmine.createSpy('MockPlace');
            MockTour = jasmine.createSpy('MockTour');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Hotel': MockHotel,
                'Place': MockPlace,
                'Tour': MockTour
            };
            createController = function() {
                $injector.get('$controller')("HotelDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dulichApp:hotelUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
