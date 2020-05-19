# Scalability
Say you have an app like Uber, and after each ride you want to place the recorded route on the map. You have 3 different types of [feature map components](/Best-Practices/Feature-Maps) that display a route.

Will you add the same map children over and over in each feature map component? What happens if you need to change the way you render the route? Will you change it in all components? 🤔

You could instead, create a feature child component or directive which will:
1. Receive your ride model as input.
2. Add a polyline with the route to the map.
3. Add markers for the start and end points.
4. Add info windows to the start and end markers.

[[_TOC_]]

# Aspiration
It would be great if we could centralize and encapsulate route rendering somehow, then reuse it inside the different map types we have, so it is scalable. Something like:
```HTML
<bs-google-map *bsSafe>
    <app-route-overlay [ride]="ride"></app-route-overlay>
<bs-google-map>
```

# Implementation
## What are you more interested in?

[Template driven solution](#Feature-Child-Component) | [Programmatic solution](#Feature-Child-Directive)

## Feature Child Component
TODO: VERIFY THAT THIS WORKS. PROABLY AN `ng-container` IS REQUIRED IN THE TEMPLATE.

We'll create a component and place all overlay directives necessary for our route rendering in its template:
```typescript
// route-overlay.component.ts

@Component({
    selector   : 'app-route-overlay',
    templateUrl: './route-overlay.component.html',
    styleUrls  : ['./route-overlay.component.css']
})
export class RouteOverlayComponent
{
    @Input public ride: Ride;

    // Additional implementation ...
}
```

```html
<!-- route-overlay.component.html -->

<bs-google-maps-marker #start [position]="ride.start.position" [icon]="YOUR_START_ICON"></bs-google-maps-marker>
<bs-google-maps-marker #end   [position]="ride.end.position"   [icon]="YOUR_END_ICON"></bs-google-maps-marker>
<bs-google-maps-polyline [path]="ride.route"></bs-google-maps-polyline>
<bs-google-maps-info [attachedTo]="start">{{route.start.time}}</bs-google-maps-info>
<bs-google-maps-info [attachedTo]="end"  >{{route.end.time}}</bs-google-maps-info>
```

## Feature Child Directive
We'll create a directive and inject it with its parent map component, then fetch the overlays superpower and use it to add the overlays:

```typescript
// route-overlay.directive.ts

@Directive({
    selector: 'app-route-overlay',
    exportAs: 'routeOverlay'
})
export class RouteOverlayDirective
{
    @Input public ride: Ride;

    private map: GoogleMap;
    
    // Inject the parent map component
    constructor(private mapComponent: GoogleMapComponent)
    {
        // Extract the map
        this.map = this.mapComponent.wrapper;
    }

    ngOnInit()
    {
        this.addOverlays();
    }

    public addOverlays(): void
    {
        // Get a hold of the map and extract the overlays superpower
        const overlays = this.map.superpowers.use(OverlaysSuperpower);
 
        const start = overlays.createMarker(ride.start.position, { icon: YOUR_START_ICON });
        const end   = overlays.createMarker(ride.end.position,   { icon: YOUR_END_ICON });

        overlays.createPolyline(ride.path);
        overlays.createInfoWindow(start, ride.start.time);
        overlays.createInfoWindow(end,   ride.end.time);
    }
}
```

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