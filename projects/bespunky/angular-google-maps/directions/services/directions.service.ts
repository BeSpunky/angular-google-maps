import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { GoogleMapsApiService, BoundsLike  } from '@bespunky/angular-google-maps/core';
import { DirectionsRequestConfig } from '../abstraction/types/directions-request-config';
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
     * 
     * 
     * @param {DirectionsPlace} from
     * @param {DirectionsPlace} to
     * @param {DirectionsRequestConfig} [options]
     * @returns {Observable<google.maps.DirectionsResult>}
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
     * 
     * TODO: This ignores the stopover option of waypoints. Find a way to incorporate.
     *
     * @param {DirectionsPlace[]} places
     * @param {Exclude<DirectionsRequestConfig, 'waypoints'>} [options]
     * @returns {Observable<google.maps.DirectionsResult>}
     */
    public through(places: DirectionsPlace[], options?: Exclude<DirectionsRequestConfig, 'waypoints'>): Observable<google.maps.DirectionsResult>
    {
        places = places || [];

        if (places.length < 2) throw new Error(`[GoogleMapsDirectionsService] Received ${places?.length} places. At least 2 places must be specified to retrieve directions.`);
        
        const nativePlaces = places.map(point => this.transform.toNativePlace(point));

        const origin      = nativePlaces[0];
        const destination = nativePlaces.slice(-1)[0];
        const waypoints   = nativePlaces.slice(1, -1).map(place => this.transform.toNativeWaypoint(place)); // This will return an empty array if out of bounds
        
        const request: google.maps.DirectionsRequest = {
            ...options,
            origin,
            destination,
            waypoints
        };

        return this.requestRoute(request);
    }
}
