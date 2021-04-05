import { ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule                    } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap                                       } from '@bespunky/angular-google-maps/core/testing';
import { directionsResult, directionsRoute                   } from '@bespunky/angular-google-maps/directions/testing';
import { camelCase                                           } from '@bespunky/angular-google-maps/_internal';
import { GoogleMapsApiService, GoogleMapsComponentApiService } from '@bespunky/angular-google-maps/core';
import { GoogleMapsInfoWindow, GoogleMapsInfoWindowDirective } from '@bespunky/angular-google-maps/overlays';
import { GoogleMapsDirections                                } from '@bespunky/angular-google-maps/directions';

describe('GoogleMapsDirections', () =>
{
    let api              : GoogleMapsApiService;
    let componentApi     : GoogleMapsComponentApiService;
    let directions       : GoogleMapsDirections;
    let runOutsideAngular: jest.SpyInstance;

    beforeEach(async () =>
    {
        ({ api, componentApi, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        directions = new GoogleMapsDirections(new MockGoogleMap(), api, new google.maps.DirectionsRenderer());

        runOutsideAngular.mockReset();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(directions).toBeTruthy());

        it('should return the bounds of the current directions', () =>
        {
            // Define the bounds 
            const route1Bounds = new google.maps.LatLngBounds({ lat: -1, lng: -1 }, { lat: 0, lng: 0 });
            const route2Bounds = new google.maps.LatLngBounds({ lat:  0, lng: 0  }, { lat: 1, lng: 1 });

            const route1 = { ...directionsRoute, bounds: route1Bounds };
            const route2 = { ...directionsRoute, bounds: route2Bounds };

            const result = { ...directionsResult, routes: [route1, route2] };

            directions.setDirections(result);

            expect(directions.getBounds().toJSON()).toEqual(route1Bounds.union(route2Bounds).toJSON());
        });

        it('should return the panel used for textual directions wrapped as an `ElementRef`', () =>
        {
            const panel = document.createElement('div');

            directions.setPanel(panel);

            const panelRef = directions.getPanel();

            expect(panelRef).toBeInstanceOf(ElementRef);
            expect(panelRef.nativeElement).toBe(panel);
        });

        function testSetPanel(createPanel: (panel: HTMLElement) => HTMLElement | ElementRef<HTMLElement>)
        {
            const panel = document.createElement('div');

            jest.spyOn(directions.native, 'setPanel').mockImplementation();
            
            directions.setPanel(createPanel(panel));

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(directions.native.setPanel).toHaveBeenCalledTimes(1);
            expect(directions.native.setPanel).toHaveBeenCalledWith(panel);
        }

        it('should set the panel used for textual directions outside angular when given an `ElementRef`',  () => testSetPanel(panel => new ElementRef(panel)));
        it('should set the panel used for textual directions outside angular when given an `HTMLElement`', () => testSetPanel(panel => panel));
    });

    describe('quick options', () =>
    {
        function testOption<T, E>(option: string, value: T, getExpected: (value: T) => T | E = (value) => value)
        {
            runOutsideAngular.mockReset();

            const expected = getExpected(value);

            expect(directions.native.get(option)).not.toBe(expected);
            
            // Set the option
            directions[`set${camelCase(option, true)}`](value);
            
            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(directions.native.get(option)).toBe(expected);
        }

        it('should set draggable',                    () => testOption('draggable', true));
        it('should set hideRouteList',                () => testOption('hideRouteList', true));
        it('should set infoWindow using a wrapper',   () => testOption('infoWindow', new GoogleMapsInfoWindow(directions.map, api, new google.maps.InfoWindow()), infoWindow => infoWindow.native));
        it('should set infoWindow using a directive', () => testOption('infoWindow', new GoogleMapsInfoWindowDirective(componentApi, new GoogleMapsInfoWindow(directions.map, api, new google.maps.InfoWindow()), null), directive => directive.wrapper.native));
        it('should set markerOptions',                () => testOption('markerOptions', {}));
        it('should set polylineOptions',              () => testOption('polylineOptions', {}));
        it('should set preserveViewport',             () => testOption('preserveViewport', true));
        it('should set suppressBicyclingLayer',       () => testOption('suppressBicyclingLayer', true));
        it('should set suppressInfoWindows',          () => testOption('suppressInfoWindows', true));
        it('should set suppressMarkers',              () => testOption('suppressMarkers', true));
        it('should set suppressPolylines',            () => testOption('suppressPolylines', true));
    });
});
