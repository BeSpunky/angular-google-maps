import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Component, Input, Output } from '@angular/core';

import { IGoogleMap               } from '../i-google-map';
import { GoogleMapFactoryProvider } from '../google-map-factory.provider';
import { ZoomLevel                } from '../types/zoom-level.enum';
import { Wrapper                  } from '../../core/decorators/wrapper.decorator';
import { GoogleMapsLifecycleBase  } from '../../core/abstraction/base/google-maps-lifecycle-base';
import { GoogleMapsEventData      } from '../../core/abstraction/events/google-maps-event-data';
import { Hook                     } from '../../core/decorators/hook.decorator';

@Component({
    selector: 'bs-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css'],
    providers: [ GoogleMapFactoryProvider ]
})
export class GoogleMapComponent extends GoogleMapsLifecycleBase
{
    // Bound properties
    @Wrapper @Input() public map: IGoogleMap;
    @Input   () public options? : google.maps.MapOptions;
    @Input   () public center?  : google.maps.LatLng;
    @Input   () public zoom?    : ZoomLevel;

    // Events
    @Hook('bounds_changed')     @Output() public boundsChanged      : Observable<GoogleMapsEventData>;
    @Hook('center_changed')     @Output() public centerChanged      : Observable<GoogleMapsEventData>;
    @Hook('zoom_changed')       @Output() public zoomChanged        : Observable<GoogleMapsEventData>;
    @Hook('click')              @Output() public click              : Observable<GoogleMapsEventData>;
    @Hook('rightclick')         @Output() public rightClick         : Observable<GoogleMapsEventData>;
    @Hook('dblclick')           @Output() public doubleClick        : Observable<GoogleMapsEventData>;
    @Hook('mousemove')          @Output() public mouseMove          : Observable<GoogleMapsEventData>;
    @Hook('mouseover')          @Output() public mouseOver          : Observable<GoogleMapsEventData>;
    @Hook('mouseout')           @Output() public mouseOut           : Observable<GoogleMapsEventData>;
    @Hook('drag')               @Output() public drag               : Observable<GoogleMapsEventData>;
    @Hook('dragstart')          @Output() public dragStart          : Observable<GoogleMapsEventData>;
    @Hook('dragend')            @Output() public dragEnd            : Observable<GoogleMapsEventData>;
    @Hook('heading_changed')    @Output() public headingChanged     : Observable<GoogleMapsEventData>;
    @Hook('maptypeid_changed')  @Output() public maptTypeChanged    : Observable<GoogleMapsEventData>;
    @Hook('projection_changed') @Output() public projectionChanged  : Observable<GoogleMapsEventData>;
    @Hook('resize')             @Output() public resize             : Observable<GoogleMapsEventData>;
    @Hook('tilesloaded')        @Output() public tilesLoaded        : Observable<GoogleMapsEventData>;
    @Hook('tilt_changed')       @Output() public tiltChanged        : Observable<GoogleMapsEventData>;
    @Hook('idle')               @Output() public idle               : Observable<GoogleMapsEventData>;
}
