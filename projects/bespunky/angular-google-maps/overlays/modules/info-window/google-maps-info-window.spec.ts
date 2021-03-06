import { fakeAsync, tick } from '@angular/core/testing';

import { configureGoogleMapsTestingModule                                       } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap, produceBoundsLikeSpecs, expectCoord                     } from '@bespunky/angular-google-maps/core/testing';
import { MockMouseEventsEmitter                                                 } from '@bespunky/angular-google-maps/overlays/testing';
import { camelCase                                                              } from '@bespunky/angular-google-maps/_internal';
import { GoogleMapsApiService, GoogleMapsComponentApiService, Coord, BoundsLike } from '@bespunky/angular-google-maps/core';
import { GoogleMapsInfoWindow, InfoWindowTrigger                                } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsInfoWindow', () =>
{
    let api              : GoogleMapsApiService;
    let componentApi     : GoogleMapsComponentApiService;
    let infoWindow       : GoogleMapsInfoWindow;
    let runOutsideAngular: jasmine.Spy;

    function createEmitter(): MockMouseEventsEmitter
    {
        return new MockMouseEventsEmitter(componentApi, infoWindow);
    }

    beforeEach(async () =>
    {
        ({ api, componentApi, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        infoWindow = new GoogleMapsInfoWindow(new MockGoogleMap(), api, new google.maps.InfoWindow());

        runOutsideAngular.calls.reset();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(infoWindow).toBeTruthy());
    });

    // This also tests getPosition()
    describe('setPosition', () => produceBoundsLikeSpecs('set the position of the info window to the element\'s center outside angular', (element) =>
    {
        infoWindow.setPosition(element);

        expect(runOutsideAngular).toHaveBeenCalledTimes(1);
        expectCoord(() => infoWindow.getPosition(), api.geometry.defineBounds(element).getCenter());
    }));

    // This also tests getTrigger()
    describe('setTrigger', () =>
    {
        it('should set the trigger for the info window', () =>
        {
            infoWindow.setTrigger('click');

            expect(infoWindow.getTrigger()).toBe('click');

            infoWindow.setTrigger('rightClick');

            expect(infoWindow.getTrigger()).toBe('rightClick');
        });

        it('should stop responding to old trigger events and start responding to new ones', () => 
        {
            const emitter = createEmitter();

            infoWindow.setAttachedTo(emitter);
            
            // Depending on the trigger, at least one event should have subscribers
            expect(emitter.isDetached).toBeFalse();
            
            const firstTriggerListeners = Object.assign({}, emitter.listeners);

            // Replace the emitter
            infoWindow.setTrigger('rightClick');

            expect(emitter.isDetached).toBeFalse();
            expect(emitter.listeners).not.toEqual(firstTriggerListeners);
        });
    });

    // This also tests getCloseAfter()
    describe('setCloseAfter', () => it('should set the auto close delay for the info window', () =>
    {
        infoWindow.setCloseAfter(300);

        expect(infoWindow.getCloseAfter()).toBe(300);

        infoWindow.setCloseAfter(2220);

        expect(infoWindow.getCloseAfter()).toBe(2220);
    }));

    describe('setAttachedTo', () =>
    {
        // This also tests getAttachedTo()
        it('should store the attached emitter', () =>
        {
            const emitter = createEmitter();

            infoWindow.setAttachedTo(emitter);

            expect(infoWindow.getAttachedTo()).toBe(emitter);
        });
        
        it('detach from any previously attached emitter and attach to the new one', () =>
        {
            const lastEmitter = createEmitter();
            // Set an emitter as if there was one previously set
            infoWindow.setAttachedTo(lastEmitter);
            
            // Depending on the trigger, at least one event should have subscribers
            expect(lastEmitter.isDetached).toBeFalse();

            const newEmitter = createEmitter();

            // Replace the emitter
            infoWindow.setAttachedTo(newEmitter);

            expect(lastEmitter.isDetached).toBeTrue();
            expect(newEmitter .isDetached).toBeFalse();
        });

        function testEventEmission(trigger: InfoWindowTrigger, emit: (emitter: MockMouseEventsEmitter, position: Coord) => void, expectedRun: 'open' | 'close' = 'open'): void
        {
            const emitter = createEmitter();

            infoWindow.setTrigger(trigger);
            infoWindow.setAttachedTo(emitter);

            const expectedRunSpy = spyOn(infoWindow.native, expectedRun).and.stub();

            const eventPosition: Coord = [1, 3];

            emit(emitter, eventPosition);

            expect(expectedRunSpy).toHaveBeenCalledTimes(1);

            if (expectedRun === 'open')
                expectCoord(() => infoWindow.getPosition(), eventPosition);
        }

        it('should make click events open the info window at mouse position for the `click` trigger', () =>
        {
            testEventEmission('click', (emitter, position) => emitter.emitClick(position));
        });
        
        it('should make mouseOver events open the info window at mouse position for the `mouseOver` trigger', () =>
        {
            testEventEmission('mouseOver', (emitter, position) => emitter.emitMousOver(position));
        });

        it('should make mouseOut events close the info window for the `mouseOver` trigger', () =>
        {
            testEventEmission('mouseOver', (emitter, position) => emitter.emitMouseOut(position), 'close');
        });
        
        it('should make doubleClick events open the info window at mouse position for the `doubleClick` trigger', () =>
        {
            testEventEmission('doubleClick', (emitter, position) => emitter.emitDoubldClick(position));
        });

        it('should make rightClick events open the info window at mouse position for the `rightClick` trigger', () =>
        {
            testEventEmission('rightClick', (emitter, position) => emitter.emitRightClick(position));
        });
    });

    describe('clearAttachedTo', () =>
    {
        it('should detach the emitter and stop listening to events', () =>
        {
            const emitter = createEmitter();

            infoWindow.setAttachedTo(emitter);

            expect(emitter.isDetached).toBeFalse();

            infoWindow.clearAttachedTo();

            expect(infoWindow.getAttachedTo()).toBeFalsy();
            expect(emitter.isDetached).toBeTrue();
        });
    });

    describe('open', () =>
    {
        function testOpen(position: BoundsLike, shouldBe: Coord)
        {
            const open = spyOn(infoWindow.native, 'open').and.stub();

            infoWindow.open(position);

            expect(open).toHaveBeenCalledTimes(1);
            expectCoord(() => infoWindow.getPosition(), shouldBe);
        }

        produceBoundsLikeSpecs('open the info window at the specified position', element => testOpen(element, api.geometry.defineBounds(element).getCenter()));

        it('should open the info window at the last assigned position if no position specified', () =>
        {
            const previouslySetPosition: Coord = [2, 4];
            
            infoWindow.setPosition(previouslySetPosition);

            testOpen(undefined, previouslySetPosition);
        });

        it('should open the info window at map center if no position specified and no position was previously assigned', () =>
        {
            spyOn(infoWindow.map, 'getCenter').and.returnValue(new google.maps.LatLng(1, 2));

            testOpen(undefined, infoWindow.map.getCenter());
        });

        it('should auto close the info window after the delay specified by `setCloseAfter()`', fakeAsync(() =>
        {
            infoWindow.setCloseAfter(1500);

            const close = spyOn(infoWindow.native, 'close').and.stub();

            infoWindow.open();

            tick(1500);

            expect(close).toHaveBeenCalledTimes(1);
        }));

        it('should NOT auto close the info window if `closeAfter` is non-positive', fakeAsync(() =>
        {
            const close = spyOn(infoWindow.native, 'close').and.stub();

            infoWindow.open();

            tick(1500);

            expect(close).not.toHaveBeenCalled();
        }));
    });

    describe('option shortcuts', () =>
    {
        function testOption(option: string, value: any)
        {
            expect(infoWindow.native.get(option)).not.toBe(value);
            
            // Set the option
            infoWindow[`set${camelCase(option, true)}`](value);
            
            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(infoWindow.native.get(option)).toBe(value);
        }

        it('should set the `disableAutoPan` option outside angular when calling `setDisableAutoPan()`', () => testOption('disableAutoPan', true));
        it('should set the `maxWidth` option outside angular when calling `setMaxWidth()`',             () => testOption('maxWidth', 1234));
        it('should set the `pixelOffset` option outside angular when calling `setPixelOffset()`',       () => testOption('pixelOffset', new google.maps.Size(11, 22)));
    });
});