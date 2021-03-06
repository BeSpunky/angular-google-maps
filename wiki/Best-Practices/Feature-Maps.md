# The Concept
Feature maps are a great way to create order and scalability. Even if you're building a small scale app, it is best to wrap the `<bs-google-map/>` component in a new component of your own. That component will serve a specific use-case for the map.

You have a view with a list of your business's branches. Each branch on the list should be displayed with a small map containing a pin with the branch's location. The map should initialize centered on the pin, with a zoom level of 8, and default UI should be disabled. 🤯

[Live demo](https://bs-angular-g-maps.web.app/Best%20Practices/Feature%20Maps)

# Aspiration
We need a reusable component that will provide branch location functionality and allow us to easily place a branch location map, like so:
```html
<!-- your-branch-list.component.html -->

<app-branch-location-map *ngFor="let branch of branches" [branch]="branch"></app-branch-location-map>
```

Imagine you have a new view with a single branch's details. Now you can simply add an `<app-branch-location-map>` component to your view.

And let's say you want the user to see a toast message each time the pin is clicked. All you have to do is implement it in your `BranchLocationMapComponent`. All of your maps will have the new toast feature. 😎

# Implementation
Down to business...
1. Create a new component that will represent a branch location map. It will receive the location by template:
    ```typescript
    // branch-location-map.component.ts
    
    import { Component, Input } from '@angular/core';
    import { Branch } from '......';
    
    @Component({
        selector   : 'app-branch-location-map',
        templateUrl: './branch-location-map.component.html',
        styleUrls  : ['./branch-location-map.component.scss'],
    })
    export class BranchLocationMapComponent
    {
        @Input() public branch: Branch;
    }
    ```

2. Define the component's template:
    ```html
    <!-- branch-location-map.component.html -->

    <bs-google-map *bsSafe [center]="branch.location"
                           [zoom]="8"
                           [options]="{ disableDefaultUI: true }">
        <bs-google-maps-marker [position]="branch.location"></bs-google-maps-marker>
    </bs-google-map>
    ```

> **Tip:** Design your `@Input` properties to receive the entire data structure (e.g. an entity, or a model) they are intended for. Model changes will require zero-to-minimal effort as you will only have to adapt the component and not the using code.

# Next Steps
| Topic | Description |
| ----- | ----------- |
| [Feature Components](/docs/additional-documentation/best-practices/feature-components.html) | Best practices for centralizing map features. |