import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';

/**
 * Represents the functionality every wrapper should provide.
 *
 * @export
 * @interface IGoogleMapsNativeObjectWrapper
 * @template TNative The type of native object being wrapped.
 */
export interface IGoogleMapsNativeObjectWrapper<TNative extends IGoogleMapsNativeObject>
{
    /** Returns the native object wrapped in the current object. */
    readonly native: TNative;
    /**
     * A place to store any data related to the object (e.g. id, business model data, etc.).
     * Might be usefull for identifying the object within collections and events.
     */
    custom: any;

    /**
     * Sets custom data on the wrapper. Defined for compatability with delegation mechanism.
     *
     * @param {*} custom Any data related to the object (e.g. id, business model data, etc.).
     */
    setCustom(custom: any): void;
}
