# Containment
Each time you add a map component to your view, a new map instance is created. Every component or directive placed inside of the map component will interact with its parent map component **only**.

This allows you to safely place multiple map components in your app, even in the same view, each having its own configuration, event handling and child components.

# Example
```html
<!-- 1st Map -->
<bs-google-map *bsSafe [center]="[20.2, 12.321]">
    <bs-google-maps-marker [position]="[20.2, 12.321]"></bs-google-maps-marker>
</bs-google-map>

<!-- 2nd Map -->
<bs-google-map *bsSafe [center]="{ lat: 30, lng: 14 }" [zoom]="3"></bs-google-map>

<!-- 3rd Map -->
<bs-google-map *bsSafe>
    <bs-google-maps-polygon [path]="[[1,1], [20,20], [40, 40]]"></bs-google-maps-marker>
</bs-google-map>
```