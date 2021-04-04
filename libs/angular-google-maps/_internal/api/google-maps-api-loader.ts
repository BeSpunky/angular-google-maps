import { Injectable } from '@angular/core';

/**
 * This is a class and not an interface so it can be injected without an injection token.
 *
 * @internal
 */
@Injectable()
export abstract class GoogleMapsApiLoader
{
    /**
     * Loads Google Maps JavaScript API.
     *
     * @abstract
     * @returns {Promise<any>} A promise that resolves when Google Maps JavaScript API has fully loaded.
     */
    abstract load(): Promise<any>;
}
