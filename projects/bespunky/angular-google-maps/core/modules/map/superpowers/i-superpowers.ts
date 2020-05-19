import { Type } from '@angular/core';

import { IGoogleMap  } from '../i-google-map';
import { ISuperpower } from './i-superpower';

/** Defines the structure of a superpowers services that should be instantiated for each map instance. */
export interface ISuperpowers
{
    /**
     * Extracts a superpower by its type. The superpower must be previously registered using `SuperpowersChargerService.charge()`.
     * Attempting to use unregistered superpowers will fail with an error.
     *
     * @template T The type of superpower being extracted.
     * @param {Type<T>} type The type of superpower being extracted.
     * @returns {T} The extracted superpower instance.
     */
    use<T extends ISuperpower>(type: Type<T>): T;
    /**
     * Attaches all superpowers to the given map.
     * Any lazy loaded superpowers registered after the call to `attachToMap()` will automatically attach to it as well.
     *
     * @param {IGoogleMap} map The map to attach the superpowers to.
     */
    attachToMap(map: IGoogleMap): void;
}