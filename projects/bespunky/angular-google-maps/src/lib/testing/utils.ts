import { TestModuleMetadata } from '@angular/core/testing';

import { GoogleMapsModule } from '../google-maps.module';
import { GoogleMapsConfig } from '../core/config/google-maps-config';
import { GoogleMapsApiLoader } from '../core/loaders/google-maps-api-loader';
import { NoOpGoogleMapsApiLoader } from '../core/loaders/no-op-google-maps-api-loader';

/** The default dummy config to use when loading the `GoogleMapsModule` for testing. */
export const defaultTestApiConfig: GoogleMapsConfig = {
    apiUrl: 'dummyurl'
};

/**
 * Creates a `TestModuleMetadeta` object that can be passed into `TestBed.configureTestingModule()` in order to
 * import the `GoogleMapsModule` and allow DI without actually downloading the API from google.
 * This changes the default `GoogleMapsApiLoader` provider to the `NoOpGoogleMapsApiLoader`.
 *
 * @export
 * @param [config] (Optional) The module configuration to use when creating the module. Default is `defaultTestApiConfig`
 * @returns A TestBed-ready module configuration.
 */
export function createDefaultTestModuleConfig(config?: GoogleMapsConfig): TestModuleMetadata
{
    return {
        imports: [GoogleMapsModule.forRoot(config || defaultTestApiConfig)],
        providers: [
            // Replace the script loader service so google api script will not be downloaded
            { provide: GoogleMapsApiLoader, useClass: NoOpGoogleMapsApiLoader }
        ]
    };
}

/**
 * Shortcuts expecting a literal position match with a native LatLng object.
 * Uses `toBeCloseTo()` with 6 digits precision.
 *
 * @param nativePosition The position retrieved from a google maps native object.
 * @param matched The mocked position to match with the native one.
 */
export function expectPositionEquals(nativePosition: google.maps.LatLng, mockPosition: google.maps.LatLng | google.maps.ReadonlyLatLngLiteral)
{
    const matchedLat = mockPosition instanceof (google.maps.LatLng) ? mockPosition.lat() : mockPosition.lat;
    const matchedLng = mockPosition instanceof (google.maps.LatLng) ? mockPosition.lng() : mockPosition.lng;

    expect(nativePosition.lat()).toBeCloseTo(matchedLat, 6);
    expect(nativePosition.lng()).toBeCloseTo(matchedLng, 6);
}
