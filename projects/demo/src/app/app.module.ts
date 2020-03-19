import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMapsModule, GoogleMapsLibrary } from '@bespunky/angular-google-maps';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        GoogleMapsModule.forRoot({
            apiUrl: {
                key: 'AIzaSyCbRqlAlzwFodU8EMnS3CJDwr1UuRiGjQY'
            },
        })
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
