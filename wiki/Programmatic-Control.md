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

## Querying The View
TODO: Add example with ViewChild

## Template References
TODO: Add example with template reference variables and passing in the wrapper to a method, both to another template element, and to a component method.

```html
<... #map></..>
<something (click)="map.wrapper.addPolygon(....)"/>
<somethingElse (click)="do(map.wrapper)"/>
```

# Custom Data
Regardless of their type, every wrapper has a `custom` property which you can use for anything. This might serve you well for storing an entity, a configuration, or an id.

This is extremely useful when handling large amounts of overlays. Once you associated an entity with a wrapper instance, you simply extract it from the emitter when an event was triggered and work on entity. **No need for keeping track of your objects, or scanning your arrays to find the relevant object.**

Here's an example:
