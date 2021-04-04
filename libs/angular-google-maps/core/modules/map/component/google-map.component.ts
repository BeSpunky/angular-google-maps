import { Observable } from 'rxjs';
import { Component, Input, Output, ViewEncapsulation } from '@angular/core';

import { GoogleMapsComponentBase                                  } from '../../../abstraction/base/google-maps-component-base';
import { IGoogleMapsEventData                                     } from '../../../abstraction/events/i-google-maps-event-data'
import { Coord                                                    } from '../../../abstraction/types/geometry.type';
import { Hook                                                     } from '../../../decorators/hook.decorator';
import { SuperpowersService                                       } from '../superpowers/superpowers.service';
import { ZoomLevel                                                } from '../types/zoom-level.enum';
import { GoogleMapFactoryProvider, NativeGoogleMapFactoryProvider } from '../google-map-factory.provider';
import { IGoogleMap                                               } from '../i-google-map';

/**
 * Adds a Google map to the app.
 *
 * @export
 * @class GoogleMapComponent
 * @extends {GoogleMapsComponentBase<IGoogleMap>}
 */
@Component({
    selector     : 'bs-google-map',
    templateUrl  : './google-map.component.html',
    styleUrls    : ['./google-map.component.scss'],
    providers    : [GoogleMapFactoryProvider, NativeGoogleMapFactoryProvider, SuperpowersService], // Every map component instance will get a new instance of the superpowers to allow a clean state
    exportAs     : 'map',
    encapsulation: ViewEncapsulation.None
})
export class GoogleMapComponent extends GoogleMapsComponentBase<IGoogleMap>
{
    @Input() public center?        : Coord;
    @Input() public clickableIcons?: boolean;
    @Input() public heading?       : number;
    @Input() public mapType?       : string | google.maps.MapTypeId;
    @Input() public options?       : google.maps.MapOptions;
    @Input() public streetView?    : google.maps.StreetViewPanorama;
    @Input() public tilt?          : number;
    @Input() public zoom?          : number | ZoomLevel;

    /** Fired when the viewport bounds have changed. */
    @Hook('bounds_changed')     @Output() public boundsChanged      : Observable<IGoogleMapsEventData>;
    /** Fired when the map center property changes. */
    @Hook('center_changed')     @Output() public centerChanged      : Observable<IGoogleMapsEventData>;
    /** Fired when the map zoom property changes. */
    @Hook('zoom_changed')       @Output() public zoomChanged        : Observable<IGoogleMapsEventData>;
    /** Fired when the user clicks on the map. An ApiMouseEvent with properties for the clicked location is returned unless a place icon was clicked, in which case an IconMouseEvent with a placeid is returned. IconMouseEvent and ApiMouseEvent are identical, except that IconMouseEvent has the placeid field. The event can always be treated as an ApiMouseEvent when the placeid is not important. The click event is not fired if a marker or infowindow was clicked. */
    @Hook('click')              @Output() public click              : Observable<IGoogleMapsEventData>;
    /** Fired when the DOM contextmenu event is fired on the map container. */
    @Hook('rightclick')         @Output() public rightClick         : Observable<IGoogleMapsEventData>;
    /** Fired when the user double-clicks on the map. Note that the click event will also fire, right before this one. */
    @Hook('dblclick')           @Output() public doubleClick        : Observable<IGoogleMapsEventData>;
    /** Fired whenever the user's mouse moves over the map container. */
    @Hook('mousemove')          @Output() public mouseMove          : Observable<IGoogleMapsEventData>;
    /** Fired when the user's mouse enters the map container. */
    @Hook('mouseover')          @Output() public mouseOver          : Observable<IGoogleMapsEventData>;
    /** Fired when the user's mouse exits the map container. */
    @Hook('mouseout')           @Output() public mouseOut           : Observable<IGoogleMapsEventData>;
    /** Fired repeatedly while the user drags the map. */
    @Hook('drag')               @Output() public drag               : Observable<IGoogleMapsEventData>;
    /** Fired when the user starts dragging the map. */
    @Hook('dragstart')          @Output() public dragStart          : Observable<IGoogleMapsEventData>;
    /** Fired when the user stops dragging the map. */
    @Hook('dragend')            @Output() public dragEnd            : Observable<IGoogleMapsEventData>;
    /** Fired when the map heading property changes. */
    @Hook('heading_changed')    @Output() public headingChanged     : Observable<IGoogleMapsEventData>;
    /** Fired when the mapTypeId property changes. */
    @Hook('maptypeid_changed')  @Output() public maptTypeChanged    : Observable<IGoogleMapsEventData>;
    /** Fired when the projection has changed. */
    @Hook('projection_changed') @Output() public projectionChanged  : Observable<IGoogleMapsEventData>;
    /** Fired when the map is resized. */
    @Hook('resize')             @Output() public resize             : Observable<IGoogleMapsEventData>;
    /** Fired when the visible tiles have finished loading. */
    @Hook('tilesloaded')        @Output() public tilesLoaded        : Observable<IGoogleMapsEventData>;
    /** Fired when the map tilt property changes. */
    @Hook('tilt_changed')       @Output() public tiltChanged        : Observable<IGoogleMapsEventData>;
    /** Fired when the map zoom property changes. */
    @Hook('idle')               @Output() public idle               : Observable<IGoogleMapsEventData>;
}
