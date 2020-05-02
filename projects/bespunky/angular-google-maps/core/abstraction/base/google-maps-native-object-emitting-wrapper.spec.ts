
import { configureGoogleMapsTestingModule, MockNative } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService                         } from '../../api/google-maps-api.service';
import { GoogleMapsNativeObjectEmittingWrapper        } from './google-maps-native-object-emitting-wrapper';

describe('GoogleMapsNativeObjectEmittingWrapper (abstract)', () =>
{
    let api                : GoogleMapsApiService;
    let runInsideAngular   : jasmine.Spy;
    let mockNative         : MockNative;
    let mockWrapper        : GoogleMapsNativeObjectEmittingWrapperTest;
    let listener           : any;
    let cancelClickListener: () => void;
    let cancelMouseListener: () => void;

    beforeEach(async () =>
    {
        ({ api, spies: { runInsideAngular } } = await configureGoogleMapsTestingModule());

        mockNative  = new MockNative();
        mockWrapper = new GoogleMapsNativeObjectEmittingWrapperTest(api, mockNative);
        
        listener            = jasmine.createSpyObj('listener', ['handleClick', 'handleMouse']);
        cancelClickListener = mockWrapper.listenTo('click', listener.handleClick);
        cancelMouseListener = mockWrapper.listenTo('mouseover', listener.handleMouse);
    });

    function triggerClick()
    {
        google.maps.event.trigger(mockWrapper.native, 'click');
    }

    function triggerMouseover()
    {
        google.maps.event.trigger(mockWrapper.native, 'mouseover');
    }

    it('should create an instance when instantiated by a derived class', () => expect(mockWrapper).toBeTruthy());

    it('should register a handler that runs inside angular when calling `listenTo()`', () =>
    {
        triggerClick();

        expect(listener.handleClick).toHaveBeenCalledTimes(1);
        expect(runInsideAngular).toHaveBeenCalledTimes(1);
    });

    it('should return a function that unregisters a specific handler registered using `listenTo()`', () =>
    {
        cancelClickListener();

        triggerClick();
        triggerMouseover();

        expect(listener.handleClick).not.toHaveBeenCalled();
        expect(listener.handleMouse).toHaveBeenCalledTimes(1);
    });

    it('should unregister all handlers for an event when calling `stopListeningTo()', () =>
    {
        mockWrapper.stopListeningTo('click');

        triggerClick();
        triggerMouseover();

        expect(listener.handleClick).not.toHaveBeenCalled();
        expect(listener.handleMouse).toHaveBeenCalledTimes(1);
    });

    it('should unregisters all handlers when calling `clearListeners()`', () =>
    {
        mockWrapper.clearListeners();

        triggerClick();
        triggerMouseover();

        triggerMouseover();

        expect(listener.handleClick).not.toHaveBeenCalled();
        expect(listener.handleMouse).not.toHaveBeenCalled();
    });
});

class GoogleMapsNativeObjectEmittingWrapperTest extends GoogleMapsNativeObjectEmittingWrapper<MockNative>
{
    protected createNativeObject(mockNative: MockNative): MockNative
    {
        return mockNative;
    }
}

