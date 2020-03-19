import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsDrawableOverlay } from '../../core/abstraction/base/google-maps-drawable-overlay';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { IGoogleMapsMarker } from './i-google-maps-marker';
import { OverlayType } from '../../core/abstraction/base/overlay-type.enum';

export class GoogleMapsMarker extends GoogleMapsDrawableOverlay<google.maps.Marker> implements IGoogleMapsMarker
{
    constructor(public map: IGoogleMap, api: GoogleMapsApiService, options?: google.maps.ReadonlyMarkerOptions)
    {
        super(OverlayType.Marker, map, api, () => new google.maps.Marker(options));
    }

    public async getPosition(): Promise<google.maps.LatLng>
    {
        const marker = await this.native;
        
        return marker.getPosition();
    }

    public setPosition(position: google.maps.LatLng | google.maps.LatLngLiteral)
    {
        this.api.runOutsideAngular(() => this.nativeObject.setPosition(position));
    }
}
