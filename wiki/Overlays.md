# The Module
Overlays are layers of information displayed on the map (see [original docs](https://developers.google.com/maps/documentation/javascript/overlays)).

`GoogleMapsOverlaysModule` will provide you with overlay directives, and charge your app with the `OverlaysSuperpower`.

If you're gonna use overlays, remember to import the module from the `overlays` package:
```typescript
import { NgModule } from '@angular/core';
import { GoogleMapsOverlaysModule } from '@bespunky/angular-google-maps/overlays';

@NgModule({
    ...,
    imports: [ ..., GoogleMapsOverlaysModule ]
})
export class AppModule { } // Or another lazy-loaded module
```

s[[_TOC_]]

# Directives
Overlay directives are placed inside a [map component](/The-Map). A directive represents a single instance of the overlay. See [supported overlays](#Supported-Overlays).

> **Scope** - Overlay directives operate within the boundaries of the map they are placed in. That map instance is the only one they recognize and interact with.

> **Iteration** - You can use `*ngFor` to create multiple instances freely.

# Superpower
The overlays superpower will allow you quick creation of overlay objects. It will additionally track your created objects for you. 🏋️‍♂️

# Using Overlays

This enables 2 things:

1. Directives
2. The Superpower


## Directives
This is how you would add a simple marker to the map.
```html
<bs-google-map *bsSafe>
    <bs-google-maps-marker [position]="[2, 31]"></bs-google-maps-marker>
</bs-google-map>
```

## Superpower

# data vs others
TODO

# Supported Overlays
|     | Type                               | Directive                   |
|:---:|------------------------------------|-----------------------------|
| ✔  | [Markers](/Overlays/Markers)       | `<bs-google-maps-marker/>`  |
| ✔  | [Polygons](/Overlays/Polygons)     | `<bs-google-maps-polygon/>` |
| 🚧 | Polylines                          |                             |
| 🚧 | Circles                            |                             |
| 🚧 | Rectangles                         |                             |
| 🚧 | Info Windows                       |                             |
| 🚧 | Symbols                            |                             |
| 🚧 | Ground Overlays                    |                             |
| 🚧 | Custom Overlays                    |                             |
| ✔  | [Data Layer](/Overlays/Data-Layer) | `<bs-google-maps-data/>`    |
