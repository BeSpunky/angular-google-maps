import { NgModule, Optional, SkipSelf } from '@angular/core';

import { _InternalModule              } from '../../_internal.module';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';

/**
 * The base class for GoogleMapsModule classes. Extended by the classes in core and async packages.
 * 
 * When extending, remember to import the following in your NgModule definition:
 * CoreModule, UniversalModule, _InternalModule
 *
 * @export
 * @class _GoogleMapsModule
 */
@NgModule()
export class _GoogleMapsModule
{
    constructor(@Optional() @SkipSelf() googleMapsModule: _GoogleMapsModule, private api: GoogleMapsInternalApiService)
    {
        if (googleMapsModule)
            throw new Error('GoogleMapsModule was previously loaded somewhere. Make sure there is only one place where you import it.');

        this.api.load().then (this.onApiLoaded)
                       .catch(this.onApiLoadError);
    }

    protected onApiLoaded()
    {
        // TODO: Notify anyone??
    }

    protected onApiLoadError(error: any)
    {
        // TODO: Notify anyone??

        console.log('[GoogleMapsModule] Google Maps API failed to load:', error);
    }
}
