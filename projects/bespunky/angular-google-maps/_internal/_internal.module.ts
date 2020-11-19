import { NgModule } from "@angular/core";

import { GoogleMapsApiReadyPromiseProvider } from './api/google-maps-api-ready.token';

/**
 * Provides internal functionality for the core and async modules.
 *
 * @internal
 * @export
 * @class _InternalModule
 */
@NgModule({
    providers: [GoogleMapsApiReadyPromiseProvider]
})
export class _InternalModule { }