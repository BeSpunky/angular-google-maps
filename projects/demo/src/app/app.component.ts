import { Component } from '@angular/core';
import { GoogleMapsApiService } from '@bespunky/angular-google-maps';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent
{
    title = 'demo';

    constructor(private api: GoogleMapsApiService)
    {
        api.whenReady.then(() => this.title = 'loaded api');
    }

    public onClick()
    {
        alert('clicked');
    }
}
