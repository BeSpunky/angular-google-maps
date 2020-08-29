# Tools
| Package 📦  | `@bespunky/angular-google-maps/overlays` |
|--------------|------------------------------------------|
| Directive ⚙ | `<bs-google-maps-info-window/>`               |
| Wrapper 🧬  | `GoogleMapsInfoWindow`                       |

Name for template reference variables: `infoWindow`

[Wrapper API](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Fmodules%2Finfo-window%2Fgoogle-maps-info-window.ts&version=GBmaster) | [Directive API](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Fmodules%2Finfo-window%2Fdirective%2Fgoogle-maps-info-window.directive.ts&version=GBmaster) | [Live Demo](https://bs-angular-ggl-maps-demo.web.app/Overlays%20Superpower/Info%20Windows)

# Concepts
Now this is a cool one... 😎

The info window offered by the library presents new API and enhances the native one. You can now:
1. Attach an info window to ANY overlay (not just markers).
2. Select between 4 different triggers (Click, MouseOver, DoubleClick, RightClick).
3. Set an auto close delay.

# Programmatically Opening
The new `open()` method receives a `BoundsLike` object and uses it to calculate the center of the specified object using its bounds.
This allows you to pass in not just coords, but polygons and other overlays.

If `open()` wasn't given anything, it will take the last position where the info window was opened.

If no previous position has been defined, the map's center will be used.

# [attachedTo]
You can always open an info window programmaticaly at a specific position on the map. But if you want your info window to react to events triggered by an overlay object (marker, polygon, etc.), you simply bind it to the `attachedTo` property:

```html
<bs-google-maps-polygon .... #polygon="polygon"></bs-google-maps-polygon>
<bs-google-maps-info-window [attachedTo]="polygon">...</bs-google-maps-info-window>
```

This will open the info window at the mouse position when the user's enters the polygon.

# [trigger]
The default trigger when attaching an overlay is the mouse over. You can change it by binding the `trigger` property, which takes an `InfoWindowTrigger` value.
These are the supported triggers and how they are defined:

```typescript
/**
 * The supported triggers for opening the info window.
 */
export declare enum InfoWindowTrigger {
    /**
     * The info window will open when the user clicks the attached element.
     */
    Click = "click",
    /**
     * The info window will open when the user enters the attached element with the mouse and close when the user exists the attached element.
     */
    MouseOver = "mouseOver",
    /**
     * The info window will open when the user double clicks the attached element.
     */
    DoubleClick = "doubleClick",
    /**
     * The info window will open when the user right clicks the attached element.
     */
    RightClick = "rightClick"
}
```

The following will make the info window open at the mouse position when the user right clicks inside the polygon:
```html
<bs-google-maps-polygon .... #polygon="polygon"></bs-google-maps-polygon>
<bs-google-maps-info-window [attachedTo]="polygon" [trigger]="'rightClick'">...</bs-google-maps-info-window>
```

# [closeAfter]
To have the info window automatically close after a predefined time, define the time in milliseconds using `closeAfter`.
When the info window opens (either automatically or programmatically), if `closeAfter` is a positive number, the info window will auto close.

The following will make the info window open at the mouse position when the user right clicks inside the polygon, and auto close it after 3 seconds:
```html
<bs-google-maps-polygon .... #polygon="polygon"></bs-google-maps-polygon>
<bs-google-maps-info-window [attachedTo]="polygon" [trigger]="'rightClick'" [closeAfter]="3000">...</bs-google-maps-info-window>
```

> Notice that the `mouseMove` trigger also closes the info window on mouse out.

# Content
Anything placed inside of your `<bs-google-maps-info-window>` element will be placed in the info window.
The info window is content aware, so you can safely use dynamic content, `*ngFor`, `*ngIf`, etc.

Here's an example:
```html
<bs-google-maps-polygon .... #polygon="polygon"></bs-google-maps-polygon>
<bs-google-maps-info-window [attachedTo]="polygon" [trigger]="'rightClick'" [closeAfter]="3000">
    <h1>Area Properties</h1>
    <p *ngFor="let property of properties">{{property.name}}: {{property.value}}</p>
</bs-google-maps-info-window>
```

# Styling
Your content will always be placed inside a `div.google-maps-info-window` container. Use the class to find your content and style it.

In the above example, the content will result in something like this:
```html
<div class="google-maps-info-window">
    <h1>Area Properties</h1>
    <p>Prop1: 1</p>
    <p>Prop2: 2</p>
    ...
</div>
```

# See Also

| Topic                             | Description                 |
|-----------------------------------|-----------------------------|
| [Geometry Types](/Geometry-Types) | Flexibility for geometries. |
