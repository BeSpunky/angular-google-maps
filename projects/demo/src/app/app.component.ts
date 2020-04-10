import { Component, ViewChild } from '@angular/core';
import { GoogleMapsApiService, GoogleMapsMarker, GoogleMapsDataDirective, GoogleMapsEventData, GoogleMapsFeature } from '@bespunky/angular-google-maps';
import { IGoogleMapsPolygon } from '../../../bespunky/angular-google-maps/src/lib/overlays/polygon/i-google-maps-polygon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent
{
    @ViewChild(GoogleMapsDataDirective)
    public data: GoogleMapsDataDirective;

    constructor(private api: GoogleMapsApiService)
    {
        api.whenReady.then(() => console.log('loaded api'));
    }

    public onClick(dataLayer: GoogleMapsDataDirective, event: GoogleMapsEventData)
    {
        if (!(event instanceof GoogleMapsEventData)) return;

        dataLayer.wrapper.createMarker(event.args[0].position)
    }

    public onMarkerClick(marker: GoogleMapsMarker)
    {
        alert('marker clicked');
    }

    public onPolygonClick(event: GoogleMapsEventData)
    {
        if (!(event instanceof GoogleMapsEventData)) return;

        (event.emitter as IGoogleMapsPolygon).setFillColor('green');
    }
}
