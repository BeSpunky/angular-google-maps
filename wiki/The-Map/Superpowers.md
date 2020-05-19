# Here Comes The Fun
Google Maps API provides different tools for doing more with your map, like placing overlays and allowing the user to draw shapes on it. The library refers to them as Superpowers ⚡💪.

[[_TOC_]]

## Injection
Superpowers are injected at the map component's level. Each map instance will have its own instances of the superpowers loaded by your system.

## Availability
Superpowers are dynamically loaded when their parent module is imported. This means two things:
1. Once you charge a superpower module, it will be available for new map instances.
2. You can lazy load superpowers to save bandwidth and download size.

> Lazy loaded superpowers will automatically be loaded and attached for existing map instances as well.

# Supported Superpowers
## Overlays


## Drawing Manager
NOT YET IMPLEMENTED

# Extending Superpowers
Custom superpowers can encapsulate and simplify your business logic work with the map. You can easily create your own superpowers and have them accompany every map instance in your app.

## Example
Say you have an app like Uber, and after each ride you want to place the recorded route on the map. You could then create a `RouteRenderSuperpower` which will:
1. Receive your ride model.
2. Extract the route and additional info from it.
3. Add a polyline with the route to the map.
4. Add markers for the starting and ending points.
5. Add info windows to the start and end markers.

## Implementation
Creating superpowers involved 2 steps:

1. Create a service for your superpower:

    > The service must extend the `Superpower` class and be injected at map level.

    ```typescript
    import { Injectable } from '@angular/core';
    import { Superpower, GoogleMapModule } from '@bespunky/angular-google-maps/core';
    
    @Injectable({ providedIn: GoogleMapModule }) // <-- 🟢 Must be injected at map level
    export class RouteRenderSuperpower extends Superpower
    {
        public render(ride: Ride): void
        {
            // Get a hold of the map and extract the overlays superpower
            const overlays = this.map.superpowers.use(OverlaysSuperpower);
    
            const start = overlays.createMarker(ride.start.position, { icon: YOUR_START_ICON_CONFIG });
            const end   = overlays.createMarker(ride.end.position,   { icon: YOUR_END_ICON_CONFIG });

            overlays.createPolyline(ride.path);
            overlays.createInfoWindow(start, ride.start.time);
            overlays.createInfoWindow(end,   ride.end.time);
        }
    }
    ```

2. Charge the superpower into the system:

    Find the proper place to inject `SuperpowersChargerService` and charge the new superpower.
    The best way would be to create a module for the superpower, register the new superpower on construction and import the module in your app:
    ```typescript
    import { NgModule } from '@angular/core';

    import { SuperpowersChargerService } from '@bespunky/angular-google-maps/core';
    import { RouteRenderSuperpower     } from 'path/to/superpower/route-render-superpower.service';

    @NgModule(/* any other module config */)
    export class RouteRenderSuperpowerModule
    {
        constructor(charger: SuperpowersChargerService)
        {
            // Use the charger service to register the superpower
            charger.charge(RouteRenderSuperpower);
        }
    }
    ```

## Usage
1. Import the superpower module once in your app:
    ```typescript
    @NgModule({
        ...
        imports: [ ..., RideRenderSuperpowerModule ]
    })
    export class AppModule { } // Or another relevant module
    ```

2.  Get a [hold of the map](/Programmatic-Control) and extract the superpower when you need to use it:
    ```typescript
    @Component(...)
    export class RouteSummaryComponent implements OnInit
    {
        @Input public ride: Ride;
    
        @ViewChild('map') private map: GoogleMap;
    
        ngOnInit()
        {
            this.map.superpowers.use(RouteRenderSuperpower).render(this.ride);
        }
    }
    ```

That's it! Pretty neat, right?? 🤟😎