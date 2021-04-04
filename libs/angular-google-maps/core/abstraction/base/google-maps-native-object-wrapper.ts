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

    /**
     * Creates an instance of GoogleMapsNativeObjectWrapper.
     * 
     * @param {GoogleMapsApiService} api The instance of the api service.
     * @param {TNative} native The instantiated native object to be wrapped.
     */
    constructor(protected api: GoogleMapsApiService, public readonly native: TNative)
    {
        if (!native) throw new Error(`Native object must be defined.`);

        return createNativeProxy(this);
    }

    public setCustom(custom: any): void
    {
        this.custom = custom;
    }
}