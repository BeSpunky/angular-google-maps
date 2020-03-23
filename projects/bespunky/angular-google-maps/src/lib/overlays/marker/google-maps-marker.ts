import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsDrawableOverlay } from '../../core/abstraction/base/google-maps-drawable-overlay';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { IGoogleMapsMarker } from './i-google-maps-marker';
import { OverlayType } from '../../core/abstraction/base/overlay-type.enum';
import { NativeObjectWrapper } from '../../core/decorators/native-object-wrapper.decorator';

/**
 * Extends intellisense for the class without providing implementation for the methods dynamically set by the framework.
 * See documentation for the `@NativeObjectWrapper()` decorator for more info.
 */
export interface GoogleMapsMarker
{
    getPosition(): Promise<google.maps.LatLng>;
    setPosition(position: google.maps.LatLng | google.maps.LatLngLiteral): Promise<void>;
}
    
@NativeObjectWrapper({
    nativeType: google.maps.Marker
})
export class GoogleMapsMarker extends GoogleMapsDrawableOverlay<google.maps.Marker> implements IGoogleMapsMarker
{
    constructor(public map: IGoogleMap, api: GoogleMapsApiService, private options?: google.maps.ReadonlyMarkerOptions)
    {
        super(OverlayType.Marker, map, api);
    }

    protected createNativeObject(): google.maps.Marker
    {
        return new google.maps.Marker(this.options);
    }
}
