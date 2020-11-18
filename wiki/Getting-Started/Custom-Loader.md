# Defining a Custom Loader For Maps API

[Live Demo](https://bs-angular-g-maps.web.app/Getting%20Started/Custom%20Loader)

1. Extend and implement the abstract [`GoogleMapsApiLoader`](/docs/injectables/GoogleMapsApiLoader.html) class:
   
    ```typescript
    import { Injectable } from '@angular/core';
    import { GoogleMapsApiLoader } from '@bespunky/angular-google-maps/core';

    @Injectable({ providedIn: 'root' })
    export class SimpleMapsApiLoader extends GoogleMapsApiLoader
    {
        public load(): Promise<any>
        {
            // Implement loading mechanism
        }
    }
    ```

2. Import `GoogleMapsModule` from the `async` package, but do not pass any param to `forRoot()` and define a provider for [`GoogleMapsApiLoader`](/docs/injectables/GoogleMapsApiLoader.html):

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';

    // Import abstract loader from `core` and maps module from `async`
    import { GoogleMapsApiLoader } from '@bespunky/angular-google-maps/core';
    import { GoogleMapsModule } from '@bespunky/angular-google-maps/async';

    import { AppComponent } from './app.component';

    @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            // 2. Include module in your app
            GoogleMapsModule.forRoot(/* Nothing here */)
        ],
        // 3. Provide the custom loader
        providers: [{ provide: GoogleMapsApiLoader, useClass: SimpleMapsApiLoader }],
        bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

3. Add a map to your application:
   
    ```html
    <!-- Your component's .html file -->
    <bs-google-map *bsSafe></bs-google-map>
    ```

Bam! You have a map on your screen! 🤟😎

> [`*bsSafe`](/docs/additional-documentation/the-map/bssafe.html) will make sure the component is only rendered after maps API is locked-and-loaded.

# Next steps
| Topic | Description |
| ----- | ----------- |
|[Plug & Play Async Loading](/docs/additional-documentation/getting-started/plug-n-play-async-loading.html)|Let the library load maps API for you.
|[Manual Loading](/docs/additional-documentation/getting-started/manually-loading.html)|Manually loading the native api.
|[Basic Concepts](/docs/additional-documentation/basic-concepts.html)|The main ideas of how this library operates.|
|[The Map](/docs/additional-documentation/the-map.html)|Controlling the map, configuring it, handling events and more.|