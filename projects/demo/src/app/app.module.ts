import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
                key: 'AIzaSyCbRqlAlzwFodU8EMnS3CJDwr1UuRiGjQY',
                libraries: [GoogleMapsLibrary.Drawing]
            },
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
