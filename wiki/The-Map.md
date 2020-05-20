# Core Component
At the heart of the library is the map. The map component will always be the top-level container for all other library components or directives. 

To place a map in your template, use the `<bs-google-map/>` element.
> Haha, yeah... 😄 `bs` stands for BeSpunky... Not the other thing you were thinking. 😏

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
Inside of a `<bs-google-map/>` component, the top level container is always a `div.google-map` element. The map component is defined with no view encapsulation, meaning you can use the `.google-map` class to identify map elements and apply styles from your host component if necessary.

# Next Steps
## More About The Map
| Topic                                   | Description                                              |
|-----------------------------------------|----------------------------------------------------------|
| [Superpowers](/The-Map/Superpowers)     | Enhance map capabilities with built-in and custom tools. |
| [Multiple Maps](/The-Map/Multiple-Maps) | Adding multiple map instances.                           |
| [*bsSafe](/The-Map/*bsSafe)             | Ensuring that maps api is loaded.                        |

## Other topics
| Topic                                         | Description                                           |
|-----------------------------------------------|-------------------------------------------------------|
| [Programmatic Control](/Programmatic-Control) | Handle your map in your component using a map object. |
| [Injectable Services](/Injectable-Services)   | Injectable tools and providers.                       |
| [Geometry Types](/Geometry-Types)             | Flexibility for geometries.                           |
| [Best Practices](/Best-Practices)             | Create scalable maps and features.                    |