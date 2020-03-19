import { Component, ViewChild } from '@angular/core';
import { GoogleMapsApiService, GoogleMapsMarker, GoogleMapsData, GoogleMapsDataDirective, GoogleMapsEventData } from '@bespunky/angular-google-maps';

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

    public onClick(event: GoogleMapsEventData)
    {
        const feature = new google.maps.Data.Feature({ geometry: new google.maps.Data.Polygon(event.args[0].position) });

        (this.data.nativeWrapper as GoogleMapsData).addFeature(feature);
    }

    public onMarkerClick(marker: GoogleMapsMarker)
    {
        alert('marker clicked');
        console.log(marker);
    }
}
