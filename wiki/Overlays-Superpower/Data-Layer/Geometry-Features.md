# Tools
| Package 📦  | `@bespunky/angular-google-maps/overlays` |
|--------------|------------------------------------------|
| Directive ⚙ | `<bs-google-maps-feature/>`              |
| Wrapper 🧬  | `GoogleMapsFeature`                      |

# Concepts
Data layer features are the parallels for normal overlays. Markers, polygons, and other friends, can be created as features as well. The type of object rendered on the map is defined by the type of geometry assigned to the feature.

[Wrapper API](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Fmodules%2Fdata%2Ffeature%2Fgoogle-maps-feature.ts&version=GBmaster) | [Directive API](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Fmodules%2Fdata%2Ffeature%2Fdirective%2Fgoogle-maps-feature.directive.ts&version=GBmaster)

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

# Feature Events
The native feature object raises only a few events. The more interesting events are raised by the native data parent. This can sometimes be uncomfortable, as you'll have to check which feature raised the event.

Using the `<bs-google-maps-feature/>` directive, events will automatically be filtered so only events raised by that specific feature will fire.

If you don't care about the specific feature which raised the event, bind your handlers to the data directive instead, and they will trigger any time any feature raises an event.

# See Also

| Topic                             | Description                 |
|-----------------------------------|-----------------------------|
| [Geometry Types](/Geometry-Types) | Flexibility for geometries. |