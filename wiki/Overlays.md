# Concept
Overlays are layers of information displayed on the map (see [original docs](https://developers.google.com/maps/documentation/javascript/overlays) for more info). The library represents them as directives which can be placed inside a [map component](/The-Map).

[[_TOC_]]

## Directive Scope
Overlay directives operate within the boundaries of the map they are placed in. That map instance is the only one they recognize and interact with.

## Superpower
The overlays superpower will allow you quick creation of overlay objects. It will additionally track your created objects and save you the need to do so yourself.

# Using Overlays
For overlays to work, you need to import `GoogleMapsOverlaysModule` from the `overlays` package:
```typescript
import { NgModule } from '@angular/core';
import { GoogleMapsOverlaysModule } from '@bespunky/angular-google-maps/overlays';

@NgModule({
    ...,
    imports: [ ..., GoogleMapsOverlaysModule ]
})
export class AppModule { } // Or another lazy-loaded module
```

This enables 2 things:

1. Overlay directives
```html
<bs-google-map *bsSafe>
    <bs-google-maps-marker [position]="[2, 31]"></bs-google-maps-marker>
</bs-google-map>
```

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
