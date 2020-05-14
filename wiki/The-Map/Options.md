# Option binding
The map component allows you to easily define map options through its template.

Examples:
```html
<bs-google-map *bsSafe 
               [center]="center"
               [zoom]="3"
               [clickableIcons]="false"
               ...
></bs-google-map>
```

> For a complete list of supported bindable options and their types, see `@Input` properties in the [map component's source code](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fmodules%2Fmap%2Fcomponent%2Fgoogle-map.component.ts&version=GBmaster&_a=contents).