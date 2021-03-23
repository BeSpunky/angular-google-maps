# The Module
📦 `@bespunky/angular-google-maps/directions`  
🧩 `GoogleMapsDirectionsModule`  

[Live demo](TODO)

The directions module allows you to both calculate and render directions on your map (see [original docs](https://developers.google.com/maps/documentation/javascript/directions)).

# Getting Started
The fastest way to add directions to your map is using the `<bs-google-maps-directions>` directive:

### Origin-Destination Directions
```html
<bs-google-map *bsSafe ...>
    <bs-google-maps-directions [from]="'Jerusalem'" [to]="Tel Aviv"></bs-google-maps-directions>
</bs-google-map>
```

### Trail Directions
```html
<bs-google-map *bsSafe ...>
    <bs-google-maps-directions [through]="['Jerusalem', [31.998041, 34.731823], 'Tel Aviv']"></bs-google-maps-directions>
</bs-google-map>
```
The first item will be considered as origin, last one as destination and everything in between will be considered a waypoint.

> ❕ Note that any change to the provided places will trigger a new directions request to Google's servers.

> 💡 To use the directive import `GoogleMapsDirectionsModule`.

> 💡 Make sure you [Enabled Directions API on Google Cloud](https://developers.google.com/maps/documentation/javascript/directions#GetStarted) and read the original docs on [Limits and Restrictions for Waypoints](https://developers.google.com/maps/documentation/javascript/directions#waypoint-limits).

# Flexible Types
Just like with [geometry types and overlays](/docs/additional-documentation/geometry-types.html), the directions module defines flexible types for places and waypoints.

In essence, it allows you to provide almost any type of data you can think of as a waypoint (even your overlays) and do something cool like the following:
```html
<bs-google-map *bsSafe ...>
    <bs-google-maps-marker  [position]="someCoord" #marker="marker"></bs-google-maps-marker>
    <bs-google-maps-polygon [path]="somePath"      #polygon="polygon"></bs-google-maps-polygon>

    <bs-google-maps-directions [through]="[marker, polygon, 'Jerusalem', [31.9, 34.7], { lat: 31.99, lng: 35 }, 'Tel Aviv']"></bs-google-maps-directions>
</bs-google-map>
```
> Note that for `BoundsLike` places, the coordinate will be calculated as the center of the shape.


### Places
Places are expressed using the [`DirectionsPlace`](/docs/miscellaneous/typealiases.html#DirectionsPlace) type and can be specified as:
- Any of the supported native types (e.g. `string | LatLng | LatLngLiteral | Place`).
- Anything that fits with `BoundsLike` ([see Interchangeability](/docs/additional-documentation/geometry-types.html)).
- Anything that fits with [`DirectionsWaypoint`](/docs/miscellaneous/typealiases.html#DirectionsWaypoint).

### Waypoints
Waypoints are expressed using the [`DirectionsWaypoint`](/docs/miscellaneous/typealiases.html#DirectionsWaypoint) type and can be specified as:
- Anything that fits with the [`google.maps.DirectionsWaypoint`](https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsWaypoint) interface.
- Anything that fits with the [`google.maps.DirectionsWaypoint`](https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsWaypoint) and has a `BoundsLike` ([see Interchangeability](/docs/additional-documentation/geometry-types.html)) assigned to the `location` property.

# Advances Directions Requests
You can further customize your direction requests by binding the `[config]` property and providing a [`google.maps.DirectionsRequest`](https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRequest) object.

> Any `origin`, `destination` or `waypoints` properties you provide within the config object will be ignored as they
> are set by the directive.

# Advanced Directions Rendering
You can further customize renderization of the directions by binding the `[options]` property and providing a [`google.maps.DirectionsRendererOptions`](https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions) object.
To set individual options, use the quick option properties (e.g. `draggable`, `hideRouteList`, etc.).

# Inside The Module

 The module is comprised of 3 players:

| Player | Job Description |
| ---   | ---         |
| [`GoogleMapsDirectionsService`](/docs/injectables/GoogleMapsDirectionsService.html) | Make requests to Google for directions. |
| [`DirectionsTransformService`](/docs/injectables/DirectionsTransformService.html) | Detecting and transforming flexible directions objects to native ones. |
| [`GoogleMapsDirectionsDirective`](/docs/directives/GoogleMapsDirectionsDirective.html) | Requesting and rendering directions on the map (uses `GoogleMapsDirectionsService` internally). |

> If you're not planning on rendering the directions on the map, or you have your own mechanism for rendering them, it is preferred that you inject `GoogleMapsDirectionsService` and use it directly without importing `GoogleMapsDirectionsModule`. This will allow the compiler to tree-shake the module.

# See Also
| Topic                                                    | Description                                   |
|----------------------------------------------------------|-----------------------------------------------|
| [Geometry Types](/docs/additional-documentation/geometry-types.html) | Flexibility for geometries. |
| [Feature Maps](/docs/additional-documentation/best-practices/feature-maps.html)             | Best practices for maps scalability.          |
| [Feature Components](/docs/additional-documentation/best-practices/feature-components.html) | Best practices for centralizing map features. |