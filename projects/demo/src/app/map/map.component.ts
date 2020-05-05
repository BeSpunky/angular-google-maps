import { Component, ViewChild } from '@angular/core';
import { GoogleMapsApiService, GoogleMapsEventData } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsPolygon, GoogleMapsMarker, GoogleMapsDataDirective, OverlaysSuperpower } from '@bespunky/angular-google-maps/overlays';

@Component({
    selector   : 'bs-map',
    templateUrl: './map.component.html',
    styleUrls  : ['./map.component.css']
})
export class MapComponent
{
    public overlays: OverlaysSuperpower

    constructor(private api: GoogleMapsApiService)
    {
        api.whenReady.then(() => console.log('loaded api'));
    }

    public onClick(dataLayer: GoogleMapsDataDirective, event: GoogleMapsEventData)
    {
        if (!(event instanceof GoogleMapsEventData)) return;

        dataLayer.wrapper.createMarker(event.args[0].position)
    }

    public onMarkerClick(event: GoogleMapsEventData)
    {
        this.overlays.removeOverlay(event.emitter as GoogleMapsMarker);
    }

    public onPolygonClick(event: GoogleMapsEventData)
    {
        if (!(event instanceof GoogleMapsEventData)) return;

        (event.emitter as IGoogleMapsPolygon).setFillColor('green');
    }
}
