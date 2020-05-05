import { InjectionToken, ClassProvider, Type } from '@angular/core';

import { IMapSuperpower } from './i-map-superpower';

/**
 * An injectable token which allows retrieving or extending the map component's superpowers.
 * Use `createSuperpowerProvider()` to create a multi class injector for any new superpower.
 */
export const Superpowers = new InjectionToken<IMapSuperpower[]>('GoogleMaps.Superpowers');

/**
 * Creates a multi-class provider for the given superpower which can be used to plug-in the superpower to the map component.
 *
 * @export
 * @param {Type<IMapSuperpower>} type The type of superpower.
 * @returns {ClassProvider} A provider 
 */
export function createSuperpowerProvider(type: Type<IMapSuperpower>): ClassProvider
{
    return {
        provide : Superpowers,
        useClass: type,
        multi   : true
    }
}