# Event handling
The map component allows you to easily hook to the map's events, and provides you with additional data about the event.

Examples:
```html
<bs-google-map *bsSafe 
               (click)="onMapClick($event)"
               (mouseMove)="onMapMouseMove($event)"
               ...
></bs-google-map>
```

> For a complete list of supported bindable events, see `@Output` properties in the [map component's source code](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fmodules%2Fmap%2Fcomponent%2Fgoogle-map.component.ts&version=GBmaster&_a=contents).

# See also
[Event data](../API/Event-Data.md)