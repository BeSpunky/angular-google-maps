# Intro
Components, directives and event handlers try to give you as much control as possible out of the box. However, advanced scenarios will probably require a different approach. This page will guide you through extracting the underlying objects from the components and using them to programmatically control what's going on with your maps.

If you still haven't read [Basic Concepts](/Basic-Concepts), now is the time...

[[_TOC_]]

# Extracting Wrappers Through Events
When an event is emitted, given that you passed in the `$event` argument, you will have direct access to the wrapper  which emitted the event.

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
import { GoogleMapsEventData, ZoomLevel } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsPolygon } from '@bespunky/angular-google-maps/overlays';

@Component({
    selector   : 'app-my-map',
    templateUrl: './my-map.component.html',
    styleUrls  : ['./my-map.component.css']
})
export class MyMapComponent
{
    public onPolygonClick(event: GoogleMapsEventData)
    {
        // Access the emitting polygon
        const polygon = event.emitter as IGoogleMapsPolygon;

        polygon.setFillColor('green');
        polygon.map.setZoom(ZoomLevel.Buildings);
    }
}
```

> If you're thinking of storing the emitter instance in a global component member so you may use it in other places as well, you can. However, it is probably better if you fetch it on init instead. Keep reading... 😉

# Custom Data
Regardless of their type, every wrapper has a `custom` property which you can use for anything. This might serve you well for storing an entity, a configuration, or an id.

This is extremely useful when handling large amounts of overlays. Once you associated an entity with a wrapper instance, you simply extract it from the emitter when an event was triggered and work on entity. **No need for keeping track of your objects, or scanning your arrays to find the relevant object.**

Here's an example:
