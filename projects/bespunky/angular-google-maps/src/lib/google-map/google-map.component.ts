import { Component, OnInit, ElementRef, ViewChild, Input, NgZone } from '@angular/core';

import { GoogleMapsApiService } from '../api/google-maps-api.service';
import { Defaults } from '../config/defaults';
import { ZoomLevel } from '../types/zoom-level.enum';

@Component({
    selector: 'bs-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit
{
    @ViewChild('map', { static: true })
    private mapElement: ElementRef;

    @Input() center?: google.maps.LatLng;
    @Input() zoom?: ZoomLevel;

    private whenReady: Promise<void>;
    private map: google.maps.Map;

    constructor(private api: GoogleMapsApiService, private zone: NgZone)
    {
        this.whenReady = this.api.whenReady;
    }

    ngOnInit()
    {
        this.zone.runOutsideAngular(() =>
        {
            this.whenReady.then(() =>
            {
                this.map = new google.maps.Map(this.mapElement.nativeElement, {
                    center: this.center || Defaults.Center,
                    zoom:   this.zoom   || Defaults.ZoomLevel
                });
            });
        });
    }
}
