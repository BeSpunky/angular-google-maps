# The Concept

Say you have an app like Uber, and you want to place the recorded route on the map. You have 3 different types of [feature map components](/docs/additional-documentation/best-practices/feature-maps.html) that display a route.

Will you add the same map children over and over in each feature map component? What happens if you need to change the way you render the route? Will you change it in all components? 🤔

You could instead, create a feature child component or directive which will:
1. Receive your ride model as input.
2. Add a polyline with the route to the map.
3. Add markers for the start and end points.
4. Add info windows to the start and end markers.

[Live demo](https://bs-angular-g-maps.web.app/Best%20Practices/Feature%20Components)

# Aspiration
It would be great if we could centralize and encapsulate route rendering somehow, then reuse it inside the different map types we have, so it is scalable. Something like:
```HTML
<bs-google-map *bsSafe>
    <app-route-overlay [ride]="ride"></app-route-overlay>
<bs-google-map>
```

# Implementation

I'm interested in a [Template driven solution](#feature-child-component) | [Programmatic solution](#feature-child-directive).

## Feature Child Component
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

> **Tip:** Design your `@Input` properties to receive the entire data structure (e.g. an entity, or a model) they are intended for. Model changes will require zero-to-minimal effort as you will only have to adapt the component and not the using code.


# Next Steps
| Topic | Description |
| ----- | ----------- |
| [Feature Maps](/docs/additional-documentation/best-practices/feature-maps.html) | Best practices for maps scalability. |