import * as _ from 'lodash';
import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { ZoomLevel } from '../types/zoom-level.enum';
import { GoogleMap } from '../google-map';
import { MapEventsMap } from '../types/map-event.enum';
import { GoogleMapsInternalApiService } from '../../core/api/google-maps-internal-api.service';
import { GoogleMapsLifecycleBase } from '../../core/abstraction/base/google-maps-lifecycle-base';
import { IGoogleMap } from '../i-google-map';
import { GeometryTransformService } from '../../utils/transform/geometry-transform.service';

@Component({
    selector: 'bs-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent extends GoogleMapsLifecycleBase
{
    @ViewChild('map', { static: true })
    private element: ElementRef;

    // Bound properties
    @Input() public map: GoogleMap;
    @Input() public center?: google.maps.LatLng;
    @Input() public zoom?: ZoomLevel;

    // Events
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

    constructor(protected api: GoogleMapsInternalApiService, private geometry: GeometryTransformService)
    {
        super(MapEventsMap, api);
    }

    protected get nativeWrapperInput(): IGoogleMap
    {
        return this.map;
    }
    
    protected createNativeWrapper(): IGoogleMap
    {
        return new GoogleMap(this.element, this.api.openApi, this.geometry);
    }
}
