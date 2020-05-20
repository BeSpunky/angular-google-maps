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

[[_TOC_]]

# Directives
Overlay directives are placed inside a [map component](/The-Map). A directive represents a single instance of the overlay (see [supported overlays](#Supported-Overlays)) and operates within the boundaries of the map it was placed in. That map instance is the only one it recognizes and interacts with.

## Example
This is how you would add a simple marker to the map for each branch of your business:
```html
<bs-google-map *bsSafe>
    <bs-google-maps-marker *ngFor="let branch of branches" [position]="branch.location"></bs-google-maps-marker>
</bs-google-map>
```

# Superpower (<small>[about superpowers](/The-Map/Superpowers)</small>)
The `OverlaysSuperpower` provides quick overlay creation methods. It will additionally track your created objects for you. 🏋️‍♂️

<details>
    <summary class="span">Let's keep it simple</summary>

    Overlay directives automatically use the superpower and track your overlays.
    If your app needs access to the tracker, access it through the superpower.
</details>
<br/>
<details>
    <summary class="span">I'll need more control</summary>

</details>

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