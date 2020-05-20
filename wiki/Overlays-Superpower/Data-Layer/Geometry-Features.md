# Tools
| Package 📦  | `@bespunky/angular-google-maps/overlays` |
|--------------|------------------------------------------|
| Directive ⚙ | `<bs-google-maps-feature/>`              |
| Wrapper 🧬  | `GoogleMapsFeature`                      |

[Wrapper API]() | [Directive API]

# Concepts
Data layer features are the parallels for normal overlays. Markers, polygons, and other friends, can be created as features as well. The type of object rendered on the map is defined by the type of geometry assigned to the feature.

Features are meant to be used in conjunction with the data layer. To create a feature, either:
* Place a feature directive inside of a data directive:
    ```html
    <bs-google-map *bsSafe>
        <bs-google-maps-data>
            <bs-google-maps-feature [geometry]="YOUR_GEOMETRY_OBJECT"></bs-google-maps-feature>
        </bs-google-maps-data>
    </bs-google-map>
    ```
* Use the data wrapper to add the feature.  
<small>[How do I access the wrapper?](/Programmatic-Control)</small>

    ```typescript
    const data = ... // Fetch the data layer wrapper

    // Quick creation methods
    data.createMarker(...);
    data.createPolygon(...);
    ...
    // Manual creation method
    data.addFeature(...);
    ```

## Quick Geometry
Each overlay type (marker, polygon, etc.) has a quick geometry property. Those are named after the overlays they will render.

You can either use a native `google.maps.Data.Geometry` object if you have it at hand, like in the example above, or use corresponding quick geometry properties to let the directive create one for ya:
```html
<bs-google-maps-feature [polygon]="[[1, 1], [2, 2], [3, 3]]"></bs-google-maps-feature>
```