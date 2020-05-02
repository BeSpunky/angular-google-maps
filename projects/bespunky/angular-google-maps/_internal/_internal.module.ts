import { NgModule } from "@angular/core";

import { GoogleMapsApiReadyPromiseProvider } from './api/google-maps-api-ready.token';

@NgModule({
    providers: [GoogleMapsApiReadyPromiseProvider]
})
export class _InternalModule { }