# Automated async loading of Google Maps API

[Live Demo](https://bs-angular-g-maps.web.app/Getting%20Started/Plug%20&%20Play)

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
            GoogleMapsModule.forRoot(apiUrl: {
                { key: 'YOUR_MAPS_API_KEY' }
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

> [`*bsSafe`](/docs/additional-documentation/the-map/*bsSafe) will make sure the component is only rendered after maps API is locked-and-loaded.

# Next steps
| Topic | Description |
| ----- | ----------- |
|[Manual Loading](/docs/additional-documentation/getting-started/manually-loading)|Manually loading the native api.
|[Custom Loader](/docs/additional-documentation/getting-started/custom-loader)|Define your own custom loader for maps api.|
|[Basic Concepts](../basic-concepts.html)|The main ideas of how this library operates.|
|[The Map](/docs/additional-documentation/the-map.html)|Controlling the map, configuring it, handling events and more.|