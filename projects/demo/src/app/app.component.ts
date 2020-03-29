import { Component, ViewChild } from '@angular/core';
import { GoogleMapsApiService, GoogleMapsMarker, GoogleMapsDataDirective, GoogleMapsEventData, GoogleMapsFeature } from '@bespunky/angular-google-maps';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent
{
    @ViewChild(GoogleMapsDataDirective)
    public data: GoogleMapsDataDirective;

    public features: GoogleMapsFeature[] = [];

    constructor(private api: GoogleMapsApiService)
    {
        api.whenReady.then(() => console.log('loaded api'));
    }

    public onClick(event: GoogleMapsEventData)
    {
        if (!(event instanceof GoogleMapsEventData)) return;

        const feature = new GoogleMapsFeature(this.api, this.data.dataLayer, { geometry: new google.maps.Data.Point(event.args[0].position) });

        this.features.push(feature);

        console.log('new feature by app', this.features.length)
    }

    public onMarkerClick(marker: GoogleMapsMarker)
    {
        alert('marker clicked');
        console.log(marker);
    }

    public async onFeatureHover(event: GoogleMapsEventData)
    {
        if (!(event instanceof GoogleMapsEventData)) return;

        console.log(`feature hovered ${this.features.indexOf(event.delegatedEmitter as GoogleMapsFeature)}`);
    }
}
