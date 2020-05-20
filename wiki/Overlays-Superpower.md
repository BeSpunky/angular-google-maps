# The Module
📦 `@bespunky/angular-google-maps/overlays`  
🧩 `GoogleMapsOverlaysModule`

Overlays are layers of information displayed on the map (see [original docs](https://developers.google.com/maps/documentation/javascript/overlays)).
The overlays module will charge your app with the `OverlaysSuperpower` and provide you with overlay directives.

> You can lazy load the module in case only some of your maps require overlays.

[[_TOC_]]

# The Superpower
<small>[About Superpowers](/The-Map/Superpowers)</small>

The `OverlaysSuperpower` provides quick overlay creation methods. It will additionally keep track of objects added and removed from the map. So now you can:
```typescript
const overlays = map.superpowers.use(OverlaysSuperpower)
```


It doesn't matter if you use directives or the superpower directly, `OverlaysSuperpower` will take care of tracking for you. 🏋️‍♂️

Using the directives or the `OverlaysSuperpower` directly both take care of tracking for you.

To retrieve all overlays attached to the map, use the `tracker` property of `OverlaysSuperpower`.

# Directives
Overlay directives are placed inside a [map component](/The-Map). A directive represents a single instance of the overlay (see [supported overlays](#Supported-Overlays)) and operates within the boundaries of the map it was placed in. That map instance is the only one it recognizes and interacts with.

## Example
This is how you would add a simple marker to the map for each branch of your business:
```html
<bs-google-map *bsSafe>
    <bs-google-maps-marker *ngFor="let branch of branches" [position]="branch.location"></bs-google-maps-marker>
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

# See Also
TODO BEST PRACTICES LINKS