import { GoogleMapsApiService           } from '../../api/google-maps-api.service';
import { IGoogleMapsNativeObject        } from '../native/i-google-maps-native-object';
import { createNativeProxy              } from '../../utils/proxy-utils';
import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';

/**
 * Provides the base functionality for all native Google Maps object wrappers.
 * 
 * @abstract
 * @implements {IGoogleMapsNativeObjectWrapper<TNative>}
 * @template TNative The type of native object the wrapper will work with.
 */
export abstract class GoogleMapsNativeObjectWrapper<TNative extends IGoogleMapsNativeObject>
           implements IGoogleMapsNativeObjectWrapper<TNative>
{
    public custom: any;

    protected nativeObject: TNative;

    /**
     * Creates an instance of GoogleMapsNativeObjectWrapper.
     * @param {GoogleMapsApiService} api The instance of the api service.
     * @param {...any[]} nativeArgs (Optional) Any arguments to pass into the native type's constructor.
     */
    constructor(protected api: GoogleMapsApiService, ...nativeArgs: any[])
    {
        this.api.runOutsideAngular(() =>
        {
            this.nativeObject = this.createNativeObject(...nativeArgs);
        });
        
        return createNativeProxy(this);
    }

    public get native(): TNative
    {
        return this.nativeObject;
    }

    /**
     * When overriden in a derived class, should creates an instance of the actual native object being wrapped.
     *
     * @protected
     * @abstract
     * @param {...any[]} nativeArgs Arguments for the construction of the native object. Theses are passed in from the constructor of the wrapper class.
     * @returns {TNative} The instantiated native object.
     */
    protected abstract createNativeObject(...nativeArgs: any[]): TNative;
}