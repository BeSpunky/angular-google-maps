import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { GoogleMapsApiService       } from '@bespunky/angular-google-maps/core';
import { DirectionsRequestConfig    } from '../abstraction/types/directions-request-config.type';
import { DirectionsPlace            } from '../abstraction/types/directions.type';
import { DirectionsTransformService } from './directions-transform.service';

type DirectionsCallback = (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => void;

/**
 * Integrates the `google.maps.DirectionsService` into the framework and provides tools for directions.
 * The service can be used directly, however the `GoogleMapsDirectionsDirective` allows integrating it and rendering it
 * directly on an existing map.
 * 
 * @see [original notes of the native service](https://developers.google.com/maps/documentation/javascript/directions)
 * 
 * Note: As this is an independent service, it is provided in root to allow using it without importing the `GoogleMapsDirectionsModule` itself.  
 *       If at any point the service becomes dependent of the module, this should be changed to `{ providedIn: GoogleMapsDirectionsModule }`.  
 *       A single instance will be created and Ivy will tree shake the service (if it is not injected anywhere in the using app) in both cases,
 *       the only difference will be the ability to use it without importing the module.
 *
 * @export
 * @class GoogleMapsDirectionsService
 */
@Injectable({ providedIn: 'root' })
export class GoogleMapsDirectionsService
{
    /** The native directions service that will be used to make the request and receive the directions. */
    private native: google.maps.DirectionsService;

    constructor(private api: GoogleMapsApiService, private transform: DirectionsTransformService)
    {
        this.initNativeService();
    }

    private initNativeService()
    {
        this.api.runOutsideAngularWhenReady(() => this.native = new google.maps.DirectionsService());
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
                    observer.error(`Failed to retrieve directions: ${status}.\nRefer to https://developers.google.com/maps/documentation/javascript/directions#DirectionsStatus for more information.`);
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
        const request: google.maps.DirectionsRequest = {
            ...options,
            origin     : this.transform.toNativePlace(from),
            destination: this.transform.toNativePlace(to)
        };

        return this.requestRoute(request);
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

        if (places.length < 2) throw new Error(`[GoogleMapsDirectionsService] Received ${places?.length} places. At least 2 places must be specified to retrieve directions.`);
        
        const origin      = this.transform.toNativePlace(places[0]);
        const destination = this.transform.toNativePlace(places.slice(-1)[0]);
        const waypoints   = places.slice(1, -1).map(place => this.transform.toNativeWaypoint(place)); // This will return an empty array if out of bounds
        
        const request: google.maps.DirectionsRequest = {
            ...options,
            origin,
            destination,
            waypoints
        };

        return this.requestRoute(request);
    }
}
