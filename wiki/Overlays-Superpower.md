# The Module
📦 `@bespunky/angular-google-maps/overlays`  
🧩 `GoogleMapsOverlaysModule`  
⚡ `OverlaysSuperpower`

Overlays are layers of information displayed on the map (see [original docs](https://developers.google.com/maps/documentation/javascript/overlays)).
The overlays module will charge your app with the `OverlaysSuperpower` and provide you with overlay directives.
It is possible to lazy load the module in case you'll only need them later.

[[_TOC_]]

# The Superpower
<small>[About Superpowers](/The-Map/Superpowers)</small> | <small>[Fetching The Map](/Programmatic-Control)</small>

The `OverlaysSuperpower` provides quick overlay creation methods. It will additionally keep track of objects added and removed from the map. So now you can:
```typescript
const overlays = map.superpowers.use(OverlaysSuperpower);

const yourMarkers  = overlays.tracker.markers; // GoogleMapsMarker[]
const yourPolygons = overlays.tracker.polygons; // GoogleMapsPolygon[]
...
```

# Directives
Overlay directives are placed inside a [map component](/The-Map). A directive represents a single instance of the overlay and operates within the boundaries of the map it was placed in. That map instance is the only one it recognizes and interacts with.

## Example
This is how you would add a simple marker to the map for each branch of your business:
```html
<bs-google-map *bsSafe>
    <bs-google-maps-marker *ngFor="let branch of branches" [position]="branch.location"></bs-google-maps-marker>
</bs-google-map>
```

> It doesn't matter if you use directives or the superpower directly, `OverlaysSuperpower` will take care of tracking for you. 🏋️‍♂️

# Supported Overlays
|     | Type                                          | Directive                   |
|:---:|-----------------------------------------------|-----------------------------|
| ✔  | [Markers](/Overlays-Superpower/Markers)       | `<bs-google-maps-marker/>`  |
| ✔  | [Polygons](/Overlays-Superpower/Polygons)     | `<bs-google-maps-polygon/>` |
| 🚧 | Polylines                                     |                             |
| 🚧 | Circles                                       |                             |
| 🚧 | Rectangles                                    |                             |
| 🚧 | Info Windows                                  |                             |
| 🚧 | Symbols                                       |                             |
| 🚧 | Ground Overlays                               |                             |
| 🚧 | Custom Overlays                               |                             |
| ✔  | [Data Layer](/Overlays-Superpower/Data-Layer) | `<bs-google-maps-data/>`    |

# Data Layer vs. Normal Overlays
Data layers are a special kind of overlay defined by Google. You can attach multiple data layers to a single map, each having multiple features (marker, polygons, etc.).

## Data Layer Advantages
* **Speed** - When working with large collections, normal overlays tend to weigh on the map. In some cases, especially when working with frameworks like Angular, the map might hang. The data layer's implementation somehow deals differently with that load, and allows a much smoother experience.

* **Standard** - Data layers accept only one type of child - a data feature. Each feature may have its own geometry definition, but all features have the same properties and methods.

* **GeoJson** - Data layers support loading GeoJsons, and WKT geometry annotations out of the box.

## Data Layer Disadvantages
* **Limited API** - Data layers support less options and events out of the box. `@bespunky/angular-google-maps` bridges the gap in certain aspects, but normal overlays are still more flexible.

## When should I use data layers?
Consider using the data layer instead of normal overlays when:
* Dealing with large collections of objects to display on the map.
* Your data contains standardized GeoJson geometries.

# See Also
| Topic                                                    | Description                                   |
|----------------------------------------------------------|-----------------------------------------------|
| [Feature Maps](/Best-Practices/Feature-Maps)             | Best practices for maps scalability.          |
| [Feature Components](/Best-Practices/Feature-Components) | Best practices for centralizing map features. |