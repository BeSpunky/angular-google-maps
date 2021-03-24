
import { GoogleMapComponent, createNativeFactoryProvider, createWrapperFactoryProvider } from '@bespunky/angular-google-maps/core';
import { GoogleMapsPolygon                                                             } from './google-maps-polygon';

/** Provides the factory used to create a polygon native for the `NativeFactory` token. */
export const NativeGoogleMapsPolygonFactoryProvider = createNativeFactoryProvider(() => new google.maps.Polygon());

/** Provides the factory used to create a polygon wrapper for the `WrapperInstance` token. */
export const GoogleMapsPolygonFactoryProvider = createWrapperFactoryProvider<GoogleMapsPolygon>((api, native, map: GoogleMapComponent) =>
{
    return new GoogleMapsPolygon(map.wrapper, api, native);
}, { deps: [GoogleMapComponent] });
