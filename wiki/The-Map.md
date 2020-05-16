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

> [See source code](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fmodules%2Fmap%2Fcomponent%2Fgoogle-map.component.ts&version=GBmaster&_a=contents) For a complete list of supported bindable `@Input` options and their types.

# Events

# Next Steps
| Topic | Description |
|-|-|
|[Superpowers](../Map/Superpowers)| Load other modules to enable other features (e.g. overlays, drawing, etc.). |
|[Programmatic Control](/Programmatic-Control)| Handle your map in your component using a map object. |
|[Multiple Maps](/The-Map/Multiple-Maps)|Best practices for multiple map instances.|
|[*bsSafe](/The-Map/*bsSafe)|Ensuring that maps api is loaded.|