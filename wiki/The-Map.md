# Core Component
At the heart of the library is the map. The map component will always be the top-level container for all other library components or directives. 

To place a map in your template, use the `<bs-google-map/>` element.
> Haha, yeah... 😄 `bs` stands for BeSpunky... Not the other thing you were thinking. 😏

Content and tools related to the map instance you're defining will always go as children of your `<bs-google-map/>` element.

# Options
[Live demo](https://bs-angular-g-maps.web.app/The%20Map/Map%20Options)

To configure your map, simply bind options using angular's syntax:

```html
<bs-google-map *bsSafe 
               [center]="center"
               [zoom]="3"
               [clickableIcons]="false"
               ...
></bs-google-map>
```

> [See API](/docs/components/GoogleMapComponent.html#inputs) for a complete list of supported bindable `@Input` options and their types.

# Events
[Live demo](https://bs-angular-g-maps.web.app/The%20Map/Map%20Events)

To handle events emitted by your map, simply bind handlers using angular's syntax and pass in the `$event` variable:
```html
<bs-google-map *bsSafe 
               (click)="onMapClick($event)"
               (mouseMove)="onMapMouseMove($event)"
               ...
></bs-google-map>
```

> [See API](/docs/components/GoogleMapComponent.html#outputs) for a complete list of supported bindable `@Output` events and their `$event` type.

# Styles
Inside of a `<bs-google-map/>` component, the top level container is always a `div.google-map` element. The map component is defined with no view encapsulation, meaning you can use the `.google-map` css selector to identify map elements and apply styles from your host component if necessary.

> Another way would be using a `::ng-deep .google-map` css selector to identify map elements and apply styles from your host component if necessary. [See `::ng-deep` deprecation discussion](https://github.com/angular/angular/issues/25160).


# Next Steps
## More About The Map
| Topic                                   | Description                                              |
|-----------------------------------------|----------------------------------------------------------|
| [Superpowers](/docs/additional-documentation/the-map/superpowers.html)     | Enhance map capabilities with built-in and custom tools. |
| [Multiple Maps](/docs/additional-documentation/the-map/multiple-maps.html) | Adding multiple map instances.                           |
| [*bsSafe](/docs/additional-documentation/the-map/bssafe.html)             | Ensuring that maps api is loaded.                        |

## Other topics
| Topic                                         | Description                                           |
|-----------------------------------------------|-------------------------------------------------------|
| [Programmatic Control](/docs/additional-documentation/programmatic-control.html) | Handle your map in your component using a map object. |
| [Injectable Services](/docs/additional-documentation/injectable-services.html)   | Injectable tools and providers.                       |
| [Geometry Types](/docs/additional-documentation/geometry-types.html)             | Flexibility for geometries.                           |
| [Best Practices](/docs/additional-documentation/best-practices.html)             | Create scalable maps and features.                    |