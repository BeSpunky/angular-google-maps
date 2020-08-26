# Intro
Components, directives and event handlers try to give you as much control as possible out of the box. However, advanced scenarios will probably require a different approach. This page will guide you through extracting the underlying objects from the components and using them to programmatically control what's going on with your maps.

If you still haven't read [Basic Concepts](/Basic-Concepts), now is the time...

[[_TOC_]]

# Accessing Wrappers

## Event Handlers
When an event is emitted, given that you passed in the `$event` argument, you will have direct access to the wrapper  which emitted the event:

```html
<!-- Your component template -->

<bs-google-map *bsSafe>
    <bs-google-maps-polygon [path]="[[1,1], [2,2], [3,3]]"
                            (click)="onPolygonClick($event)"></bs-google-maps-polygon>
</bs-google-map>
```

```typescript
// Your component class

import { Component } from '@angular/core';
import { GoogleMapsEventData, ZoomLevel, GoogleMap } from '@bespunky/angular-google-maps/core';
import { GoogleMapsPolygon } from '@bespunky/angular-google-maps/overlays';

@Component({...})
export class MyMapComponent
{
    public onPolygonClick(event: GoogleMapsEventData)
    {
        const polygon       = event.emitter as GoogleMapsPolygon; // Access emitting polygon
        const map           = polygon.map as GoogleMap; // Access to the containing map instance
        const nativePolygon = polygon.native; // Access to native google.maps.Polygon object
        const nativeMap     = map.native; // Access to native google.maps.Map object
       
        polygon.setFillColor('green');
        polygon.map.setZoom(ZoomLevel.Buildings);

        // ... more manipulation
    }
}
```

> If you're thinking of storing the emitter instance as a component member so you may use it in other places as well, you can. However, it is probably better if you fetch it on init instead. Keep reading... 😉

[Live demo](https://bs-angular-ggl-maps-demo.web.app/Programmatic%20Control/Wrappers%20From%20Events)

## Querying The View
```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ZoomLevel, GoogleMap, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsPolygon, GoogleMapsPolygonDirective } from '@bespunky/angular-google-maps/overlays';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit
{
    // Query for the <bs-google-maps> component instance
    @ViewChild(GoogleMapComponent) private mapComponent: GoogleMapComponent;

    private map: GoogleMap;
    
    ngAfterViewInit()
    {
        // The <bs-google-map> component is initialized. Extract wrapper.
        this.map = this.mapComponent.wrapper as GoogleMap;
    }
}
```

[Live demo](https://bs-angular-ggl-maps-demo.web.app/Programmatic%20Control/Wrappers%20From%20%60ViewChild%60)

# Template References
To use the map component's api in your template, assign your variable with the `map` value. This will give your variable access to the `wrapper` property.

```html
<bs-google-map *bsSafe #yourMapVariable="map" ...></bs-google-map>

<button (click)="yourMapVariable.wrapper.fitBounds(...)"/>
```

> Other components and directives in the library normally use a camelCase name to export their api (e.g. `marker`, `polygon`, `dataLayer`...). See the docs relevant to the component for the exported name.

[Live demo](https://bs-angular-ggl-maps-demo.web.app/Programmatic%20Control/Wrappers%20Directly%20In%20Template)

# Custom Data
Regardless of their type, every wrapper has a `custom` property which you can use for anything. This might serve you well for storing an entity, a configuration, or an id.

This is extremely useful when handling large amounts of overlays. Once you associated an entity with a wrapper instance, you simply extract it from the emitter when an event was triggered and work on that entity. **No need for keeping track of your objects, or scanning your arrays to find the relevant object.**

Here's an example:

```html
<!-- Your component template -->
<bs-google-map *bsSafe>
    <!-- Use the `custom` attribute to bind the entity to the marker -->
    <bs-google-maps-marker *ngFor="let place of specialPlaces.getAll() | async"
                           
                           [position]="place.coords"
                           [custom]="place"

                           (click)="onSpecialPlaceClicked($event)">
    >
    </bs-google-maps-marker>
</bs-google-map>
```

```typescript
// The marker click event handler for your component
public onSpecialPlaceClicked(event: GoogleMapsEventData): void
{
    // Extract the entity from the clicked marker and directly pass it to the data service
    this.specialPlaces.incrementViews(event.emitter.custom);
}
```

[Live demo](https://bs-angular-ggl-maps-demo.web.app/Programmatic%20Control/Custom%20Data)

# Next Steps
| Topic                                       | Description                        |
|---------------------------------------------|------------------------------------|
| [Injectable Services](/Injectable-Services) | Injectable tools and providers.    |
| [Geometry Types](/Geometry-Types)           | Flexibility for geometries.        |
| [Best Practices](/Best-Practices)           | Create scalable maps and features. |