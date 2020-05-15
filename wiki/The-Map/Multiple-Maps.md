# Containment
Each time you add a map component to your view, a new map instance is created. Every component or directive placed inside of the map component will interact with its parent map component **only**.

This allows you to safely place multiple map components in your app, even in the same view, each having its own configuration, event handling and child components.

```html
<bs-google-map *bsSafe [center]="[20.2, 12.321]">
    <bs-google-maps-marker [position]="[20.2, 12.321]"></bs-google-maps-marker>
</bs-google-map>

<bs-google-map *bsSafe [center]="{ lat: 30, lng: 14 }" [zoom]="3"></bs-google-map>

<bs-google-map *bsSafe>
    <bs-google-maps-polygon [path]="[[1,1], [20,20], [40, 40]]"></bs-google-maps-marker>
</bs-google-map>
```

# Best Practices
Even if you're building a small scale app, it is best to wrap the map component in a new component of your own.
That component will serve a specific use-case for the map and will allow order and scalability.

## Example

Let's say you have a view with a list of your business's branches. Each branch on the list should be displayed with a small map containing a pin with the branch's location. The map should initialize centered on the pin, with a zoom level of 8, and default UI should be disabled. 🤯

1. Create a new component that will represent a branch location map:

    `> ng generate component BranchLocationMap`

2. Program the component to receive the location by template:
    ```typescript
    // branch-location-map.component.ts
    
    import { Component, Input } from '@angular/core';
    import { Coord } from '@bespunky/angular-google-maps/core';
    
    @Component({
        selector   : 'app-branch-location-map',
        templateUrl: './branch-location-map.component.html',
        styleUrls  : ['./branch-location-map.component.scss'],
    })
    export class BranchLocationMapComponent
    {
        @Input() public location: Coord;
    }
    ```

3. Define the component's template:
    ```html
    <!-- branch-location-map.component.html -->

    <bs-google-map *bsSafe [center]="location"
                           [zoom]="8"
                           [options]="{ disableDefaultUI: true }">
        <bs-google-maps-marker [position]="location"></bs-google-maps-marker>
    </bs-google-map>
    ```

4. Use the new component in your list view component:
    ```html
    <!-- your-branch-list.component.html -->

    <app-branch-location-map *ngFor="let branch of branches" [location]="branch.location"></app-branch-location-map>
    ```

# Scalability
Imagine you have a new view with a single branch's details. Now you can simply add an `<app-branch-location-map>` component to your view.

And let's say you want the user to see a toast message each time the pin is clicked. All you have to do implement it in your `BranchLocationMapComponent`. All of your maps will have the new toast feature. 😎