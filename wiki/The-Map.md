# Intro
At the core of the library is the map. The map component will always be the top-level container for all other library components or directives. 

To place a map in your template, use the `<bs-google-map/>` element.
> Haha, yeah... 😄 `bs` stands BeSpunky... Not the other thing you were thinking. 😏

Content and tools related to the map instance you're defining will always go as children of your `<bs-google-map/>` element.


[[_TOC_]]

# Options
To configure your map, simply bind options using angular's syntax:

```html
<bs-google-map *bsSafe 
               [center]="center"
               [zoom]="3"
               [clickableIcons]="false"
               ...
></bs-google-map>
```

> [See source code](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fmodules%2Fmap%2Fcomponent%2Fgoogle-map.component.ts&version=GBmaster&_a=contents) for a complete list of supported bindable `@Input` options and their types.

# Events
To handle events emitted by your map, simply bind handlers using angular's syntax and pass in the `$event` variable:
```html
<bs-google-map *bsSafe 
               (click)="onMapClick($event)"
               (mouseMove)="onMapMouseMove($event)"
               ...
></bs-google-map>
```

> [See source code](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fmodules%2Fmap%2Fcomponent%2Fgoogle-map.component.ts&version=GBmaster&_a=contents) for a complete list of supported bindable `@Output` events and their `$event` type.

# Styles
Inside of a `<bs-google-map/>` component, the top level container is always a `div.google-map` element. The map component is defined with no view encapsulation, meaning you can use the `.google-map` class to identify map elements and apply styles if necessary.

# Next Steps
| Topic | Description |
|-|-|
|[Event Handling](/Event-Handling)|A deeper look on event handling.|
|[Superpowers](../Map/Superpowers)| Load other modules to enable other features (e.g. overlays, drawing, etc.). |
|[Programmatic Control](/Programmatic-Control)| Handle your map in your component using a map object. |
|[Multiple Maps](/The-Map/Multiple-Maps)|Best practices for multiple map instances.|
|[*bsSafe](/The-Map/*bsSafe)|Ensuring that maps api is loaded.|