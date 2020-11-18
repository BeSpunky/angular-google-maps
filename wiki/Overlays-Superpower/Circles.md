# Tools
| Package 📦  | `@bespunky/angular-google-maps/overlays` |
|--------------|------------------------------------------|
| Directive ⚙ | `<bs-google-maps-circle/>`               |
| Wrapper 🧬  | `GoogleMapsCircle`                       |

Name for template reference variables: `circle`

[Wrapper API](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Fmodules%2Fcircle%2Fgoogle-maps-circle.ts&version=GBmaster) | [Directive API](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Fmodules%2Fcircle%2Fdirective%2Fgoogle-maps-circle.directive.ts&version=GBmaster) | [Live Demo](https://bs-angular-g-maps.web.app/Overlays%20Superpower/circles.html)

# Positioning
The circle's center can be set using any geometry matching `BoundsLike` (see [Geometry Types](/docs/additional-documentation/geometry-types.html)). The wrapper will automatically get the center of the element's bounding box and use it as the position.

You can now position circles on top of other elements (e.g. a polygon) by setting the element as the position:

```html
<bs-google-maps-polygon .... #polygon="polygon"></bs-google-maps-polygon>
<bs-google-maps-circle [center]="polygon.wrapper" [radius]="400000"></bs-google-maps-circle>
```

# See Also

| Topic                             | Description                 |
|-----------------------------------|-----------------------------|
| [Geometry Types](/docs/additional-documentation/geometry-types.html) | Flexibility for geometries. |
