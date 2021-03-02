import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { filter, mergeMap                                  } from 'rxjs/operators';
import { Directive, ElementRef, Inject, Input, Output      } from '@angular/core';

import { EmittingNativeWrapperFactory, GoogleMapsComponentApiService, GoogleMapsComponentBase, Hook, IGoogleMapsEventData, WrapperFactory } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsInfoWindow                                                                                                            } from '@bespunky/angular-google-maps/overlays';
import { DirectionsRequestConfig             } from '../abstraction/types/directions-request-config';
import { DirectionsPlace                     } from '../abstraction/types/types';
import { GoogleMapsDirectionsService         } from '../services/directions.service';
import { GoogleMapsDirectionsFactoryProvider } from '../google-maps-directions-factory.provider';
import { GoogleMapsDirections                } from '../google-maps-directions';

@Directive({
    selector : 'bs-google-maps-directions',
    exportAs : 'directions',
    providers: [GoogleMapsDirectionsFactoryProvider]
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
    
    private requestConfig : BehaviorSubject<DirectionsRequestConfig> = new BehaviorSubject(null);
    private requestFrom   : BehaviorSubject<DirectionsPlace>         = new BehaviorSubject(null);
    private requestTo     : BehaviorSubject<DirectionsPlace>         = new BehaviorSubject(null);
    private requestThrough: BehaviorSubject<DirectionsPlace[]>       = new BehaviorSubject(null);

    /** This event is fired when the rendered directions change, either when a new DirectionsResult is set or when the user finishes dragging a change to the directions path. */
    @Hook('directions_changed') @Output() public directionsChanged: Observable<IGoogleMapsEventData>;
 
    constructor(
        private directions         : GoogleMapsDirectionsService,
                api                : GoogleMapsComponentApiService,
                @Inject(WrapperFactory)
                createNativeWrapper: EmittingNativeWrapperFactory<GoogleMapsDirections>,
                element            : ElementRef
    )
    {
        super(api, createNativeWrapper, element);

        this.initDirectionsFeeds();
    }
    
    private initDirectionsFeeds(): void
    {
        const directionsChanged = merge(this.routeFeed(), this.routeThroughFeed());

        this.subscribe(directionsChanged, directions => this.wrapper.setDirections(directions));
    }

    private routeFeed(): Observable<google.maps.DirectionsResult>
    {
        const routeTriggers = combineLatest([this.requestFrom, this.requestTo]);
        
        return this.directionsFeedFor(
            routeTriggers,
            ([from, to]) => !!(from && to),
            ([from, to], config) => this.directions.route(from, to, config)
        );
    }

    private routeThroughFeed(): Observable<google.maps.DirectionsResult>
    {
        const routeThroughTriggers = this.requestThrough;
        
        return this.directionsFeedFor(
            routeThroughTriggers,
            (place) => !!place,
            (place, config) => this.directions.through(place, config)
        );
    }

    private directionsFeedFor<T>(places: Observable<T>, runIf: (places: T) => boolean, getDirections: (places: T, config: DirectionsRequestConfig) => Observable<google.maps.DirectionsResult>): Observable<google.maps.DirectionsResult>
    {
        return combineLatest([places, this.requestConfig]).pipe(
            filter(([place]) => runIf(place)),
            mergeMap(([place, config]) => getDirections(place, config))
        );
    }

    @Input() public set config (config: DirectionsRequestConfig) { this.requestConfig .next(config); }
    @Input() public set from   (place: DirectionsPlace)          { this.requestFrom   .next(place);  }
    @Input() public set to     (place: DirectionsPlace)          { this.requestTo     .next(place);  }
    @Input() public set through(places: DirectionsPlace[])       { this.requestThrough.next(places); }
}
