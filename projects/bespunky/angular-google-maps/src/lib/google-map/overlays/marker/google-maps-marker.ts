import { IGoogleMap } from '../../i-google-map';
import { GoogleMapsDrawableOverlay } from '../../../core/abstraction/angular/overlays/google-maps-drawable-overlay';
import { GoogleMapsApiService } from '../../../core/api/google-maps-api.service';
import { IGoogleMapsMarker } from './i-google-maps-marker';

export class GoogleMapsMarker extends GoogleMapsDrawableOverlay implements IGoogleMapsMarker
{
    private whenReady: Promise<void>;
    private marker: google.maps.Marker;

    constructor(public map: IGoogleMap, api: GoogleMapsApiService, options?: google.maps.ReadonlyMarkerOptions)
    {
        super(map, api);

        this.whenReady = this.api.whenReady;

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
