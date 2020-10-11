# Tools
| Package 📦  | `@bespunky/angular-google-maps/overlays` |
|--------------|------------------------------------------|
| Directive ⚙ | `<bs-google-maps-marker/>`               |
| Wrapper 🧬  | `GoogleMapsMarker`                       |

Name for template reference variables: `marker`

[Wrapper API](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Fmodules%2Fmarker%2Fgoogle-maps-marker.ts&version=GBmaster) | [Directive API](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Fmodules%2Fmarker%2Fdirective%2Fgoogle-maps-marker.directive.ts&version=GBmaster) | [Live Demo](https://bs-angular-ggl-maps-demo.web.app/Overlays%20Superpower/Markers)

# Positioning
Marker position can be set using any geometry matching `BoundsLike` (see [Geometry Types](/Geometry-Types)). The wrapper will automatically get the center of the element's bounding box and use it as the position.

You can now position markers on top of other elements (e.g. a polygon) by setting the element as the position:

```html
<bs-google-maps-polygon .... #polygon="polygon"></bs-google-maps-polygon>
<bs-google-maps-marker [position]="polygon.wrapper"></bs-google-maps-marker>
```

# See Also

| Topic                             | Description                 |
|-----------------------------------|-----------------------------|
| [Geometry Types](/Geometry-Types) | Flexibility for geometries. |
