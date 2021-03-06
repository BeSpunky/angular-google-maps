# Tools
| Package 📦  | `@bespunky/angular-google-maps/overlays` |
|--------------|------------------------------------------|
| Directive ⚙ | `<bs-google-maps-feature/>`              |
| Wrapper 🧬  | `GoogleMapsFeature`                      |

Name for template reference variables: `feature`

[Wrapper API](/docs/classes/GoogleMapsFeature.html) | [Directive API](/docs/directives/GoogleMapsFeatureDirective.html) | [Live Demo](https://bs-angular-g-maps.web.app/Overlays%20Superpower/Data%20Layer)

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
* Or use the data wrapper to add the feature.  
<small>[How do I access the wrapper?](/docs/additional-documentation/programmatic-control.html)</small>

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

The `<bs-google-maps-feature/>` directive is smart and allows you access to events raised by its parent data object, while automatically filtering them so that only events raised by that specific feature will fire.

If you don't care about the specific feature which raised the event, bind your handlers to the data directive instead, and they will trigger any time any feature raises an event.

# See Also

| Topic                             | Description                 |
|-----------------------------------|-----------------------------|
| [Geometry Types](/docs/additional-documentation/geometry-types.html) | Flexibility for geometries. |