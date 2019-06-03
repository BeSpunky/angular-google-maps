import * as _ from 'lodash';
import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';

import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { ZoomLevel } from '../types/zoom-level.enum';
import { GoogleMap } from '../google-map';
import { MapEventsMap } from '../types/map-event.enum';
import { GoogleMapMarker } from '../../google-map-marker/google-map-marker';

@Component({
    selector: 'bs-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit, OnDestroy, OnChanges
{
    @ViewChild('map', { static: true })
    private element: ElementRef;

    @Input() public map?: GoogleMap;
    @Input() public center?: google.maps.LatLng;
    @Input() public zoom?: ZoomLevel;

    @Output() public boundsChanged      = new EventEmitter();
    @Output() public centerChanged      = new EventEmitter();
    @Output() public zoomChanged        = new EventEmitter();
    @Output() public click              = new EventEmitter();
    @Output() public rightClick         = new EventEmitter();
    @Output() public doubleClick        = new EventEmitter();
    @Output() public mouseMove          = new EventEmitter();
    @Output() public mouseOver          = new EventEmitter();
    @Output() public mouseOut           = new EventEmitter();
    @Output() public drag               = new EventEmitter();
    @Output() public dragStart          = new EventEmitter();
    @Output() public dragEnd            = new EventEmitter();
    @Output() public headingChanged     = new EventEmitter();
    @Output() public maptTypeChanged    = new EventEmitter();
    @Output() public projectionChanged  = new EventEmitter();
    @Output() public resize             = new EventEmitter();
    @Output() public tilesLoaded        = new EventEmitter();
    @Output() public tiltChanged        = new EventEmitter();
    @Output() public idle               = new EventEmitter();

    constructor(private api: GoogleMapsApiService) { }

    // <map (marker.drag)="onMarkerDrag($event)"
    public marker: GoogleMapMarker;

    ngOnInit()
    {
        this.map = this.map || new GoogleMap(this.element, this.api);

        this.api.hookEmitters(this, MapEventsMap, this.map);
    }

    ngOnChanges(changes: SimpleChanges)
    {
        for (const propertyName in changes)
        {
            // This will use the setters methods of the map class to set the new values of @Input() values
            if (this.map[propertyName])
                this.map[propertyName] = changes[propertyName].currentValue;
        }
    }

    ngOnDestroy()
    {
        this.api.unhookEmitters(MapEventsMap, this.map);
    }
}
