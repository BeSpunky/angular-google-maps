import { Component, ViewChild } from '@angular/core';
import { GoogleMapsApiService, GoogleMapsEventData } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsPolygon, GoogleMapsMarker, GoogleMapsDataDirective, GoogleMapsFeature } from '@bespunky/angular-google-maps/overlays';

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
