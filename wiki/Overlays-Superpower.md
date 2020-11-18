# The Module
📦 `@bespunky/angular-google-maps/overlays`  
🧩 `GoogleMapsOverlaysModule`  
⚡ `OverlaysSuperpower`

[Live demo](https://bs-angular-g-maps.web.app/Overlays%20Superpower/Overlay%20Tracking)

Overlays are layers of information displayed on the map (see [original docs](https://developers.google.com/maps/documentation/javascript/overlays)).  
The overlays module will provide you with directives for each overlay type, and will also charge your app with the `⚡ OverlaysSuperpower`.

The most basic way to use overlays is to include overlay directives inside your map component.
# Bootstrap
Import `GoogleMapsOverlaysModule` in your app and you're good to go. 👍

> You can also lazy load the module in case you'll only need it later.

# Directives
Overlay directives are placed inside a [map component](/docs/additional-documentation/the-map.html). A directive represents a single instance of the overlay and operates within the boundaries of the map it was placed in. That map instance is the only one it recognizes and interacts with.

## Example
This is how you would add a simple marker to the map for each branch of your business:
```html
<bs-google-map *bsSafe>
    <bs-google-maps-marker *ngFor="let branch of branches" [position]="branch.location"></bs-google-maps-marker>
</bs-google-map>
```

# Supported Overlays
|     | Type                                              | Directive ⚙                    | Wrapper 🧬            |
|:---:|---------------------------------------------------|---------------------------------|------------------------|
| ✔  | [Markers](/docs/additional-documentation/overlays-superpower/markers.html)           | `<bs-google-maps-marker/>`      | `GoogleMapsMarker`     |
| ✔  | [Polygons](/docs/additional-documentation/overlays-superpower/polygons.html)         | `<bs-google-maps-polygon/>`     | `GoogleMapsPolygon`    |
| 🚧 | Polylines                                         |                                 |                        |
| ✔  | [Circles](/docs/additional-documentation/overlays-superpower/circles.html)           | `<bs-google-maps-circle/>`      | `GoogleMapsCircle`     |
| 🚧 | Rectangles                                        |                                 |                        |
| ✔  | [Info Windows](/docs/additional-documentation/overlays-superpower/info-windows.html) | `<bs-google-maps-info-window/>` | `GoogleMapsInfoWindow` |
| 🚧 | Symbols                                           |                                 |                        |
| 🚧 | Ground Overlays                                   |                                 |                        |
| 🚧 | Custom Overlays                                   |                                 |                        |
| ✔  | [Data Layer](/docs/additional-documentation/overlays-superpower/data-layer.html)     | `<bs-google-maps-data/>`        | `GoogleMapsData`       |

# The Superpower
<small>[About Superpowers](/docs/additional-documentation/the-map/superpowers.html)</small> | <small>[Fetching The Map](/docs/additional-documentation/programmatic-control.html)</small>

The `OverlaysSuperpower` provides quick overlay creation methods. It will additionally keep track of objects added and removed from the map. So now you can:
```typescript
const overlays = map.superpowers.use(OverlaysSuperpower);
```
###### Quick Creation Methods
```typescript
// Automatically added to the map
const marker  = overlays.createMarker([1, 1]);
const polygon = overlays.createPolygon([1, 1], [2, 2], [3, 3]);
...
```
###### Overlay Tracking
```typescript
// Access the currently placed overlays
const yourMarkers  = overlays.tracker.markers; // GoogleMapsMarker[]
const yourPolygons = overlays.tracker.polygons; // GoogleMapsPolygon[]
// ...

// Subscribe to changes
overlays.tracker.changes.subscribe(...);

```
> It doesn't matter if you use directives or the superpower directly, `OverlaysSuperpower` will take care of tracking for you. 🏋️‍♂️

## Easy Access
Another way to quickly extract the superpower is using the 2-way-binding `overlay` property:
```html
<!-- Your component template -->

<bs-google-map *bsSafe [(overlays)]="overlays"></bs-google-map>
```
```typescript
// Your component class

@Component(...)
export class YourComponent implements OnInit
{
    public overlays: OverlaysSuperpower; // You can name this however you want of course

    ngOnInit()
    {
        // `this.overlays` will hold the superpower without having to fetch it through the map.
    }
}
```

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
* You already retrieve your data in GeoJson format.
* You are using WKT geometries.

# See Also
| Topic                                                    | Description                                   |
|----------------------------------------------------------|-----------------------------------------------|
| [Feature Maps](/docs/additional-documentation/best-practices/feature-maps.html)             | Best practices for maps scalability.          |
| [Feature Components](/docs/additional-documentation/best-practices/feature-components.html) | Best practices for centralizing map features. |