# Defining a Custom Loader For Maps API

[Live Demo](https://bs-angular-ggl-maps-demo.web.app/Getting%20Started/Custom%20Loader)

1. Extend and implement the abstract `GoogleMapsApiLoader` class:
   
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

2. Import `GoogleMapsModule` from the `async` package, but do not pass any param to `forRoot()` and define a provider for `GoogleMapsApiLoader`:

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
            // 2. Include module in your app (no params)
            GoogleMapsModule.forRoot()
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

> [`*bsSafe`](/The-Map/*bsSafe) will make sure the component is only rendered after maps API is locked-and-loaded.

# Next steps
| Topic | Description |
| ----- | ----------- |
|[Plug & Play Async Loading](/Getting-Started/Plug-n-Play-Async-Loading)|Let the library load maps API for you.
|[Manual Loading](/Getting-Started/Manually-Loading)|Manually loading the native api.
|[Basic Concepts](../Basic-Concepts.md)|The main ideas of how this library operates.|
|[The Map](/The-Map)|Controlling the map, configuring it, handling events and more.|