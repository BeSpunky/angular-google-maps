# Tools
| Package 📦  | `@bespunky/angular-google-maps/overlays` |
|--------------|------------------------------------------|
| Directive ⚙ | `<bs-google-maps-marker/>`               |
| Wrapper 🧬  | `GoogleMapsMarker`                       |

Name for template reference variables: `marker`

[Wrapper API](/docs/classes/GoogleMapsMarker.html) | [Directive API](/docs/directives/GoogleMapsMarkerDirective.html) | [Live Demo](https://bs-angular-g-maps.web.app/Overlays%20Superpower/Markers)

# Positioning
Marker position can be set using any geometry matching `BoundsLike` (see [Geometry Types](/docs/additional-documentation/geometry-types.html)). The wrapper will automatically get the center of the element's bounding box and use it as the position.

You can now position markers on top of other elements (e.g. a polygon) by setting the element as the position:

```html
<bs-google-maps-polygon .... #polygon="polygon"></bs-google-maps-polygon>
<bs-google-maps-marker [position]="polygon.wrapper"></bs-google-maps-marker>
```

# See Also

| Topic                             | Description                 |
|-----------------------------------|-----------------------------|
| [Geometry Types](/docs/additional-documentation/geometry-types.html) | Flexibility for geometries. |
