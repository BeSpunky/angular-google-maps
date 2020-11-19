import { Delegation } from './wrapper-definition';

/** The symbol used for identifying the outside angular metadata of a wrapper object. See [@OutsideAngular](/docs/miscellaneous/functions.html#OutsideAngular) decorator. */
export const OutsideAngularSymbol = Symbol('outsideAngular');

/**
 * Wraps the method with a call to `api.runOutsideAngular()`.
 * Methods decorated with this are expected to have access to a `GoogleMapsApiService` instance via `this.api`.
 * 
 * This should be used inside classes marked with `@NativeObjectWrapper`.
 * In general, methods that change the map, its configuration, or cause it to redraw, should be marked with `@OutsideAngular`.
 * This will prevent unnecessary change detection runs as native Google Maps code is not associated with angular.
 */
export function OutsideAngular(target: Object, methodName: string, descriptor: PropertyDescriptor)
{
    const decorated = Reflect.getMetadata(OutsideAngularSymbol, target.constructor) || { };

    decorated[methodName] = Delegation.OutsideAngular;

    Reflect.defineMetadata(OutsideAngularSymbol, decorated, target.constructor);
}