import { BehaviorSubject, merge, Observable           } from 'rxjs';
import { Directive, ElementRef, Inject, Input, Output } from '@angular/core';

import { GoogleMapsComponentApiService, GoogleMapsComponentBase, Hook, IGoogleMapsEventData, WrapperInstance } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsInfoWindow                                                                               } from '@bespunky/angular-google-maps/overlays';
import { DirectionsRequestConfig                                                                             } from '../abstraction/types/directions-request-config.type';
import { DirectionsPlace                                                                                     } from '../abstraction/types/directions.type';
import { GoogleMapsDirectionsService                                                                         } from '../services/google-maps-directions.service';
import { GoogleMapsDirectionsFactoryProvider, NativeGoogleMapsDirectionsFactoryProvider                      } from '../google-maps-directions-factory.provider';
import { GoogleMapsDirections                                                                                } from '../google-maps-directions';

/**
 * Renders directions for the specified waypoints on the map.
 *
 * Must be placed inside a `<bs-google-map/>` element.
 * 
 * @export
 * @class GoogleMapsDirectionsDirective
 * @extends {GoogleMapsComponentBase<GoogleMapsDirections>}
 */
@Directive({
    selector : 'bs-google-maps-directions',
    exportAs : 'directions',
    providers: [GoogleMapsDirectionsFactoryProvider, NativeGoogleMapsDirectionsFactoryProvider]
})
export class GoogleMapsDirectionsDirective extends GoogleMapsComponentBase<GoogleMapsDirections>
{
    @Input() public panel     : ElementRef | HTMLElement;
    @Input() public routeIndex: number;
    @Input() public options   : google.maps.DirectionsRendererOptions;

    @Input() public draggable             : boolean;
    @Input() public hideRouteList         : boolean;
    @Input() public infoWindow            : GoogleMapsComponentBase<IGoogleMapsInfoWindow> | IGoogleMapsInfoWindow;
    @Input() public markerOptions         : google.maps.MarkerOptions;
    @Input() public polylineOptions       : google.maps.PolylineOptions;
    @Input() public preserveViewport      : boolean;
    @Input() public suppressBicyclingLayer: boolean;
    @Input() public suppressInfoWindows   : boolean;
    @Input() public suppressMarkers       : boolean;
    @Input() public suppressPolylines     : boolean;
    
    /** This event is fired when the rendered directions change, either when a new DirectionsResult is set or when the user finishes dragging a change to the directions path. */
    @Hook('directions_changed') @Output() public directionsChanged: Observable<IGoogleMapsEventData>;
 
    private requestConfig : BehaviorSubject<DirectionsRequestConfig> = new BehaviorSubject(null);
    private requestFrom   : BehaviorSubject<DirectionsPlace>         = new BehaviorSubject(null);
    private requestTo     : BehaviorSubject<DirectionsPlace>         = new BehaviorSubject(null);
    private requestThrough: BehaviorSubject<DirectionsPlace[]>       = new BehaviorSubject(null);

    constructor(
        private directions         : GoogleMapsDirectionsService,
                api                : GoogleMapsComponentApiService,
                @Inject(WrapperInstance)
                wrapper            : GoogleMapsDirections,
                element            : ElementRef
    )
    {
        super(api, wrapper, element);

        this.initDirectionsFeeds();
    }
    
    private initDirectionsFeeds(): void
    {
        const directionsChanged = merge(
            this.directions.routeFeed  (this.requestFrom, this.requestTo, this.requestConfig),
            this.directions.throughFeed(this.requestThrough, this.requestConfig)
        );

        this.subscribe(directionsChanged, directions => this.wrapper.setDirections(directions));
    }

    // TODO: Feeds will currently not trigger for overlay directives changing their bounds. This is probably due
    // to the fact that the library delegates properties to native setters but doesn't delegate getters to properties.
    // Fix it.
    
    /** Sets the routing configuration to use for each directions request. */
    @Input() public set config (config: DirectionsRequestConfig) { this.requestConfig .next(config); }
    /** Sets the origin of the route. Must be used along with `[to]`. If this is provided, `[through]` must not be provided. */
    @Input() public set from   (place: DirectionsPlace)          { this.requestFrom   .next(place);  }
    /** Sets the destination of the route. Must be used along with `[from]`. If this is provided, `[through]` must not be provided. */
    @Input() public set to     (place: DirectionsPlace)          { this.requestTo     .next(place);  }
    /** Sets the places the route should go through. This is a more flexible alternative to `from` and `to`. If this is provided, neither `[from]` nor `[to]` should be provided. */
    @Input() public set through(places: DirectionsPlace[])       { this.requestThrough.next(places); }
}
