# Tools
| Package 📦  | `@bespunky/angular-google-maps/overlays` |
|--------------|------------------------------------------|
| Directive ⚙ | `<bs-google-maps-feature/>`              |
| Wrapper 🧬  | `GoogleMapsFeature`                      |

[Wrapper API]() | [Directive API]

# Concepts
Data layer features are the parallels for normal overlays. Markers, polygons, and other friends, can be created as features as well. The type of object rendered on the map is defined by the type of geometry assigned to the feature.

## 
If you already have a native `google.maps.Data.Geometry` object in your hand and you simply want it to render, use the `geometry` property:
```html
<bs-google-maps-feature [geometry]="yourGeometryObject"></bs-google-maps-feature>
```

If you don't, and you know the 

Have you seen [how geometries are generated natively](https://developers.google.com/maps/documentation/javascript/datalayer#polygon)? Quite the effort, right...?
