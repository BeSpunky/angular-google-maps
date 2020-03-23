export interface IGoogleMapsNativeObjectWrapper
{
    /** When Google Maps API is ready, should return the native object. */
    readonly native: Promise<any>;
    /**
     * A place to store any data related to the object (e.g. id, business model data, etc.).
     * Might be usefull for identifying the object within collections and events.
     */
    custom: any;
}
