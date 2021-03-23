import { Injectable } from '@angular/core';
import { NativeServiceToken, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';

/** A type for the native functions of the directions service which should be wrapped. Used along with the extension interface for the wrapper. */
export type WrappedGoogleMapsDirectionsServiceFunctions = WrappedNativeFunctions<google.maps.DirectionsService>;

export interface NativeDirectionsService extends WrappedGoogleMapsDirectionsServiceFunctions { }

/**
 * A root injectable service to use as the native directions service. Injected by `GoogleMapsDirectionsService`.
 * This service is actually constructed as `google.maps.DirectionsService`. See `NativeServiceToken` for more info.
 * 
 * @export
 * @class NativeDirectionsService
 * @extends {NativeServiceToken}
 */
@Injectable({ providedIn: 'root' })
export class NativeDirectionsService extends NativeServiceToken
{
    constructor()
    {
        super();

        return new google.maps.DirectionsService();
    }
}

