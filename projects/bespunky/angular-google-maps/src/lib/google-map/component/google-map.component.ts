import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Component, Input, Output } from '@angular/core';

import { MapEventsMapProvider     } from './map-event.enum';
import { IGoogleMap               } from '../i-google-map';
import { GoogleMapFactoryProvider } from '../google-map-factory.provider';
import { ZoomLevel                } from '../types/zoom-level.enum';
import { Wrapper                  } from '../../core/decorators/wrapper.decorator';
import { GoogleMapsLifecycleBase  } from '../../core/abstraction/base/google-maps-lifecycle-base';
import { GoogleMapsEventData      } from '../../core/abstraction/events/google-maps-event-data';

@Component({
    selector: 'bs-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css'],
    providers: [
        GoogleMapFactoryProvider,
        MapEventsMapProvider
    ]
})
export class GoogleMapComponent extends GoogleMapsLifecycleBase
{
    // Bound properties
    @Wrapper @Input() public map: IGoogleMap;
    @Input   () public options? : google.maps.MapOptions;
    @Input   () public center?  : google.maps.LatLng;
    @Input   () public zoom?    : ZoomLevel;

    // Events
    @Output() public boundsChanged      : Observable<GoogleMapsEventData>;
    @Output() public centerChanged      : Observable<GoogleMapsEventData>;
    @Output() public zoomChanged        : Observable<GoogleMapsEventData>;
    @Output() public click              : Observable<GoogleMapsEventData>;
    @Output() public rightClick         : Observable<GoogleMapsEventData>;
    @Output() public doubleClick        : Observable<GoogleMapsEventData>;
    @Output() public mouseMove          : Observable<GoogleMapsEventData>;
    @Output() public mouseOver          : Observable<GoogleMapsEventData>;
    @Output() public mouseOut           : Observable<GoogleMapsEventData>;
    @Output() public drag               : Observable<GoogleMapsEventData>;
    @Output() public dragStart          : Observable<GoogleMapsEventData>;
    @Output() public dragEnd            : Observable<GoogleMapsEventData>;
    @Output() public headingChanged     : Observable<GoogleMapsEventData>;
    @Output() public maptTypeChanged    : Observable<GoogleMapsEventData>;
    @Output() public projectionChanged  : Observable<GoogleMapsEventData>;
    @Output() public resize             : Observable<GoogleMapsEventData>;
    @Output() public tilesLoaded        : Observable<GoogleMapsEventData>;
    @Output() public tiltChanged        : Observable<GoogleMapsEventData>;
    @Output() public idle               : Observable<GoogleMapsEventData>;
}
