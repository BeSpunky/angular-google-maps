import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@bespunky/angular-google-maps';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        GoogleMapsModule.forRoot({
            apiUrl: { key: '' },
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
