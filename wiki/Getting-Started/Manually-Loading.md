# Manually loading Google Maps API
[Live demo](https://bs-angular-ggl-maps-demo.web.app/Getting%20Started/Manual%20Loading)

In case you prefer placing the `<script>` tag manually, or you have your own loading mechanism for fetching Google's Maps API, you can simply import the main module with no configuration.

🌳 This will tree-shake the entire `async` module and its dependencies.

> Note you will have to ensure:
> 1. Loading Maps API completely before your map component gets loaded.
> 2. Loading of all native libraries you're gonna use ([see docs](https://developers.google.com/maps/documentation/javascript/libraries)).

# Example
1. Import `GoogleMapsModule` from the `core` package:

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';

    import { GoogleMapsModule } from '@bespunky/angular-google-maps/core'; // 1. Import module

    import { AppComponent } from './app.component';

    @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            // 2. Include module in your app
            GoogleMapsModule.forRoot()
        ],
        providers: [], 
        bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

2. Add a map to your application:
   
    ```html
    <!-- Your component's .html file -->
    <bs-google-map></bs-google-map>
    ```

Bam! You have a map on your screen! 🤟😎

# Next steps
| Topic | Description |
| ----- | ----------- |
|[Plug & Play Async Loading](/Getting-Started/Plug-n-Play-Async-Loading)|Let the library load the native api for ya. 💪
|[Custom Loader](/Getting-Started/Custom-Loader)|Define your own custom loader for maps api.|
|[Basic Concepts](../Basic-Concepts.md)|The main ideas of how this library operates.|
|[The Map](/The-Map)|Controlling the map, configuring it, handling events and more.|