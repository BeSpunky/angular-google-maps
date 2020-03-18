import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsDrawableOverlay } from '../../core/abstraction/base/google-maps-drawable-overlay';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { IGoogleMapsMarker } from './i-google-maps-marker';
import { OverlayType } from '../../core/abstraction/base/overlay-type.enum';

export class GoogleMapsMarker extends GoogleMapsDrawableOverlay implements IGoogleMapsMarker
{
    private marker: google.maps.Marker;

    constructor(public map: IGoogleMap, api: GoogleMapsApiService, options?: google.maps.ReadonlyMarkerOptions)
    {
        super(OverlayType.Marker, map, api);

        this.whenReady.then(() =>
        {
            this.marker = new google.maps.Marker(options);
        });
    }

    public get native(): Promise<google.maps.Marker>
    {
        return this.whenReady.then(() => this.marker);
    }

    public async getPosition(): Promise<google.maps.LatLng>
    {
        await this.whenReady;

        return this.marker.getPosition();
    }

    public setPosition(position: google.maps.LatLng | google.maps.LatLngLiteral)
    {
        this.api.runOutsideAngular(() => this.marker.setPosition(position));
    }
}
