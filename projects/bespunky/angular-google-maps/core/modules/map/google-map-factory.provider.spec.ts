import { ElementRef } from '@angular/core';

import { expectCoord, MockNative, testNativeFactoryProvider, testWrapperFactoryProvider                    } from '@bespunky/angular-google-maps/core/testing';
import { Defaults, GoogleMap, GoogleMapFactoryProvider, NativeGoogleMapFactoryProvider, SuperpowersService } from '@bespunky/angular-google-maps/core';

const mockElement = new ElementRef(document.createElement('div'));

testNativeFactoryProvider({
    providerName      : 'NativeGoogleMapFactoryProvider',
    provider          : NativeGoogleMapFactoryProvider,
    expectedNativeType: google.maps.Map,
    element           : mockElement,
    additionalSpecs   : {
        browser: (producedNative: () => google.maps.Map) =>
        {
            it('should create the map as a div.google-map inside of the current element', () => expect(mockElement.nativeElement.querySelector('.google-map')).toBeDefined());
            it('should attach the native map to the created div.google-map', () => expect(producedNative().getDiv().parentElement).toBe(mockElement.nativeElement));
            it('should create the native map with the default center', () => expectCoord(() => producedNative().getCenter(), Defaults.Center));
            it('should create the native map with the default zoom', () => expect(producedNative().getZoom()).toBe(Defaults.ZoomLevel));
        }
    }
});

testWrapperFactoryProvider({
    providerName       : 'GoogleMapFactoryProvider',
    provider           : GoogleMapFactoryProvider,
    expectedWrapperType: GoogleMap,
    mockNative         : new MockNative(),
    providers          : [SuperpowersService]
});