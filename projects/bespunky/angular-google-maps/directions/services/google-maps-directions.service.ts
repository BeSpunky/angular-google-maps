import { combineLatest, Observable } from 'rxjs';
import { filter, mergeMap          } from 'rxjs/operators';
import { Injectable                } from '@angular/core';

import { Delegation, GoogleMapsApiService, GoogleMapsNativeObjectWrapper, NativeObjectWrapper } from '@bespunky/angular-google-maps/core';
import { DirectionsRequestConfig                                                              } from '../abstraction/types/directions-request-config.type';
import { DirectionsPlace                                                                      } from '../abstraction/types/directions.type';
import { DirectionsTransformService                                                           } from './transform/directions-transform.service';
import { NativeDirectionsService                                                              } from './google-maps-directions-service-factory.provider';

export type DirectionsCallback = (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => void;

/**
 * Integrates the `google.maps.DirectionsService` into the framework and provides tools for directions.
 * The service can be used directly, however the `GoogleMapsDirectionsDirective` allows integrating it and rendering it
 * directly on an existing map.
 * 
 * @see [original notes of the native service](https://developers.google.com/maps/documentation/javascript/directions)
 * 
 * Note: This service is intended to be injected once, at root level. Therefore the native object provider should also be
 * provided at root level. `GoogleMapsDirectionsModule` should be imported `forRoot()` to provide the native factory.
 *
 * @export
 * @class GoogleMapsDirectionsService
 */
@Injectable({ providedIn: 'root' })
@NativeObjectWrapper<GoogleMapsDirectionsService>({ route: Delegation.OutsideAngular })
export class GoogleMapsDirectionsService extends GoogleMapsNativeObjectWrapper<google.maps.DirectionsService>
{
    constructor(private transform: DirectionsTransformService, api: GoogleMapsApiService, native: NativeDirectionsService)
    {
        super(api, native);
    }

    /**
     * Finds the directions from the first place to the last place, through all the places in between. If no travel mode was provided
     * `google.maps.TravelMode.DRIVING` will be used.
     * 
     * If the native service returned an `'OK'` status, the observable will emit the results. Otherwise, the observable will
     * error with the status code received in the response.
     * @See original docs about [result status](https://developers.google.com/maps/documentation/javascript/directions#DirectionsStatus).
     *
     * @param {DirectionsPlace[]} places The array of places to pass through. The first item will be considered as origin, the last one as destination,
     * and all of which are in between will be considered waypoints. At least 2 items must be provided.
     * @param {Exclude<DirectionsRequestConfig, 'waypoints'>} [options] (Optional) Any additional route options.
     * @returns {Observable<google.maps.DirectionsResult>} The directions for the specified places.
     */
    public through(places: DirectionsPlace[], options?: Exclude<DirectionsRequestConfig, 'waypoints'>): Observable<google.maps.DirectionsResult>
    {
        places = places || [];

        if (places.length < 2) throw new Error(`[GoogleMapsDirectionsService] Received ${places.length} places. At least 2 places must be specified to retrieve directions.`);

        const origin      = this.transform.toNativePlace(places[0]);
        const destination = this.transform.toNativePlace(places.slice(-1)[0]);
        const waypoints   = places.slice(1, -1).map(place => this.transform.toNativeWaypoint(place));  // This will return an empty array if out of bounds

        const request: google.maps.DirectionsRequest = {
            ...options,
            origin,
            destination,
            waypoints
        };

        return this.requestRoute(request);
    }

    /**
     * Finds the directions from the specified origin to the specified destination. If no travel mode was provided
     * `google.maps.TravelMode.DRIVING` will be used.
     * 
     * If the native service returned an `'OK'` status, the observable will emit the results. Otherwise, the observable will
     * error with the status code received in the response.
     * @See original docs about [result status](https://developers.google.com/maps/documentation/javascript/directions#DirectionsStatus).
     * 
     * @param {DirectionsPlace} from The origin for the route.
     * @param {DirectionsPlace} to The destination of the route.
     * @param {DirectionsRequestConfig} [options] (Optional) Any additional route options.
     * @returns {Observable<google.maps.DirectionsResult>} The directions for the specified points.
     */
    public route(from: DirectionsPlace, to: DirectionsPlace, options?: DirectionsRequestConfig): Observable<google.maps.DirectionsResult>
    {
        const throwNullError = (name: string) => { throw new Error(`[GoogleMapsDirectionsService] '${name}' must be specified`); };

        if (!from) throwNullError('from');
        if (!to) throwNullError('to');

        return this.through([from, to], options);
    }

    /**
     * Creates a feed that emits a new directions result for each change in places or route configuration.
     *
     * @param {Observable<DirectionsPlace[]>} places The feed that emits the places to route through.
     * @param {Observable<Exclude<DirectionsRequestConfig, 'waypoints'>>} config The feed that emits the routing configuration.
     * @returns {Observable<google.maps.DirectionsResult>} A feed that emits a new directions result for each change in places or route configuration.
     */
    public throughFeed(places: Observable<DirectionsPlace[]>, config: Observable<Exclude<DirectionsRequestConfig, 'waypoints'>>): Observable<google.maps.DirectionsResult>
    {
        const feed = places.pipe(filter(places => !!places));

        return this.feedFor(feed, config);
    }

    /**
     * Creates a feed that emits a new directions result for each change origin, destination or route configuration.
     *
     * @param {Observable<DirectionsPlace>} from The feed that emits the origin to route from.
     * @param {Observable<DirectionsPlace>} to The feed that emits the destination to route to.
     * @param {Observable<DirectionsRequestConfig>} config The feed that emits the routing configuration.
     * @returns {Observable<google.maps.DirectionsResult>} A feed that emits a new directions result for each change origin, destination or route configuration.
     */
    public routeFeed(from: Observable<DirectionsPlace>, to: Observable<DirectionsPlace>, config: Observable<DirectionsRequestConfig>): Observable<google.maps.DirectionsResult>
    {
        const feed = combineLatest([from, to]).pipe(filter(([from, to]) => !!(from && to)));

        return this.feedFor(feed, config);
    }

    /**
     * Creates a feed that emits a new directions result for each change in places or route configuration.
     *
     * @private
     * @param {Observable<DirectionsPlace[]>} placesFeed The feed that emits the places to route through.
     * @param {Observable<DirectionsRequestConfig>} configFeed The feed that emits the routing configuration.
     * @returns {Observable<google.maps.DirectionsResult>} A feed that emits a new directions result for each change in places or route configuration.
     */
    private feedFor(placesFeed: Observable<DirectionsPlace[]>, configFeed: Observable<DirectionsRequestConfig>): Observable<google.maps.DirectionsResult>
    {
        return combineLatest([placesFeed, configFeed]).pipe(
            mergeMap(([places, config]) => this.through(places, config))
        );
    }

    /**
     * Creates an observable that, when subscribed to, launches a directions request safely (i.e. when api is ready).
     *
     * @private
     * @param {google.maps.DirectionsRequest} request The directions request to send.
     * @returns {Observable<google.maps.DirectionsResult>} An observable that emits the results for the specified directions request.
     */
    private requestRoute(request: google.maps.DirectionsRequest): Observable<google.maps.DirectionsResult>
    {
        return new Observable<google.maps.DirectionsResult>(observer =>
        {
            const handleDirectionsResult: DirectionsCallback = (result, status) =>
            {
                if (status === google.maps.DirectionsStatus.OK)
                {
                    observer.next(result);
                    observer.complete();
                }
                else
                    observer.error(`${status} - Failed to retrieve directions\nRefer to https://developers.google.com/maps/documentation/javascript/directions#DirectionsStatus for more information.`);
            };

            // Wait for the native service to be assigned, then use it outside Angular
            this.api.runOutsideAngularWhenReady(() => this.nativeRequestRoute(request, handleDirectionsResult));
        });
    }

    /**
     * Applies default values for mandatory options which were not provided and executes the directions request
     * through the native `google.maps.DirectionsService`.
     *
     * @private
     * @param {google.maps.DirectionsRequest} request The request to execute.
     * @param {DirectionsCallback} handleDirectionsResult The callback to execute once directions result have returned.
     */
    private nativeRequestRoute(request: google.maps.DirectionsRequest, handleDirectionsResult: DirectionsCallback): void
    {
        // This cannot be a global const as it uses values from the google namespace which is lazy-loaded
        const defaultConfig: DirectionsRequestConfig = {
            travelMode: google.maps.TravelMode.DRIVING
        };

        request = { ...defaultConfig, ...request };

        this.native.route(request, handleDirectionsResult);
    }
}
