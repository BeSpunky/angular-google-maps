import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GoogleMapsModule } from '@bespunky/angular-google-maps/async';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        GoogleMapsModule.forRoot({
            apiUrl: {
                key: 'AIzaSyD2W_Cuuh-njEbh709te-kmcttVUlGoYeA'
            },
        })
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
