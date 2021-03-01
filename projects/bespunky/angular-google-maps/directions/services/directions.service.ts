import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { GoogleMapsApiService, BoundsLike  } from '@bespunky/angular-google-maps/core';
import { DirectionsRequestOptions } from '../abstraction/types/directions-request-options';
import { DirectionsPlace } from '../abstraction/types/types';
import { DirectionsTransformService } from './directions-transform.service';

type DirectionsCallback = (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => void;

/**
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
    private native: google.maps.DirectionsService;

    constructor(private api: GoogleMapsApiService, private transform: DirectionsTransformService)
    {
        this.initNativeService();
    }

    private initNativeService()
    {
        this.api.runOutsideAngularWhenReady(() => this.native = new google.maps.DirectionsService());
    }

    private requestRoute(request: google.maps.DirectionsRequest): Observable<google.maps.DirectionsResult>
    {
        const routeRequest = new Promise<google.maps.DirectionsResult>((resolve, reject) =>
        {
            const handleDirectionsResult: DirectionsCallback = (result, status) =>
            {
                status === google.maps.DirectionsStatus.OK ? resolve(result) : reject(`Failed to retrieve directions: ${status}.\nRefer to https://developers.google.com/maps/documentation/javascript/directions#DirectionsStatus for more information.`);
            };

            this.api.runOutsideAngularWhenReady(() => this.native.route(request, handleDirectionsResult));
        });

        return from(routeRequest);
    }

    /**
     * TO: Current position.
     *
     * @abstract
     * @param {DirectionsPlace} place
     * @param {DirectionsRequestOptions} [options]
     * @returns {Observable<google.maps.DirectionsResult>}
     */
    public from(place: DirectionsPlace, options?: DirectionsRequestOptions): Observable<google.maps.DirectionsResult>
    {
        const request: google.maps.DirectionsRequest = {
            ...options,
            origin     : this.transform.toNativePlace(place),
            destination: this.transform.toNativePlace('Israel') // TODO: Implement a service to detect the current location and plant here
        };

        return this.requestRoute(request);
    }
    
    /**
     * FROM: Current position
     *
     * @abstract
     * @param {DirectionsPlace} place
     * @param {DirectionsRequestOptions} [options]
     * @returns {Observable<google.maps.DirectionsResult>}
     */
    public to(place: DirectionsPlace, options?: DirectionsRequestOptions): Observable<google.maps.DirectionsResult>
    {
        const request: google.maps.DirectionsRequest = {
            ...options,
            origin     : this.transform.toNativePlace('Israel'), // TODO: Implement a service to detect the current location and plant here
            destination: this.transform.toNativePlace(place)
        };

        return this.requestRoute(request);
    }
    /**
     *
     *
     * @param {DirectionsPlace} from
     * @param {DirectionsPlace} to
     * @param {DirectionsRequestOptions} [options]
     * @returns {Observable<google.maps.DirectionsResult>}
     */
    public route(from: DirectionsPlace, to: DirectionsPlace, options?: DirectionsRequestOptions): Observable<google.maps.DirectionsResult>
    {
        const request: google.maps.DirectionsRequest = {
            ...options,
            origin     : this.transform.toNativePlace(from),
            destination: this.transform.toNativePlace(to)
        };

        return this.requestRoute(request);
    }

    /**
     * 
     * TODO: This ignores the stopover option of waypoints. Find a way to incorporate.
     *
     * @param {BoundsLike[]} elements
     * @param {Exclude<DirectionsRequestOptions, 'waypoints'>} [options]
     * @returns {Observable<google.maps.DirectionsResult>}
     */
    public through(elements: BoundsLike[], options?: Exclude<DirectionsRequestOptions, 'waypoints'>): Observable<google.maps.DirectionsResult>
    {
        if (elements?.length < 2) throw new Error(`[GoogleMapsDirectionsService] Received ${elements?.length} elements. At least 2 elements must be specified to retrieve directions.`);
        
        const places = elements.map(point => this.transform.toNativePlace(point));

        const origin      = places[0];
        const destination = places.slice(-1)[0];
        const waypoints   = places.slice(1, -1).map(place => this.transform.toNativeWaypoint(place));  // This will return an empty array if out of bounds
        
        const request: google.maps.DirectionsRequest = {
            ...options,
            origin,
            destination,
            waypoints
        };

        return this.requestRoute(request);
    }
}
