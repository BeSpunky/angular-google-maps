# Automated async loading of Google Maps API

1. Import `GoogleMapsModule` from the `async` package.

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';

    import { GoogleMapsModule } from '@bespunky/angular-google-maps/async'; // 1. Import module

    import { AppComponent } from './app.component';

    @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            // 2. Include module in your app
            GoogleMapsModule.forRoot({
                key: 'YOUR_MAPS_API_KEY'
            })
        ],
        providers: [], 
        bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

2. Add a map to your application:
   
    ```html
    <!-- Your component's .html file -->
    <bs-google-map *bsSafe></bs-google-map>
    ```

Bam! You have a map on your screen! 🤟😎

> [`*bsSafe`](/The-Map/*bsSafe) will make sure the component is only rendered after maps API is locked-and-loaded.

# Next steps
| Topic | Description |
| ----- | ----------- |
|[Manual Loading](/Getting-Started/Manually-Loading)|Manually loading the native api.
|[Basic Concepts](../Basic-Concepts.md)|The main ideas of how this library operates.|
|[The Map](/The-Map)|Controlling the map, configuring it, handling events and more.|