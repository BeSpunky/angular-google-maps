# Here Comes The Fun
Google Maps API provides different tools for doing more with your map, like placing overlays and allowing the user to draw shapes on it. `@bespunky/angular-google-maps` refers to them as **Superpowers** ⚡💪.

[[_TOC_]]

## Injection
Superpowers are injected at the map component's level. Each map instance will have its own instances of the superpowers loaded by your system.

## Availability
Superpowers are dynamically loaded when their parent module is imported. This means two things:
1. Once you charge a superpower module, it will be available for new map instances.
2. You can lazy load superpowers to save bandwidth and download size.

> Lazy loaded superpowers will automatically be loaded and attached for existing map instances as well.

## Usage
The built-in components and directive internally use the superpowers, but you can manually use them too. To use the overlays superpower to create a marker for example, simply [get a hold of the map wrapper instance](/Programmatic-Control), then extract the required superpower like so:
```typescript
const overlays = map.superpowers.use(OverlaysSuperpower);

overlays.createMarker([11, 22]);
```

> The corresponding module must be imported before using the superpower.

# Supported Superpowers
The following are superpowers provided by the library out of the box. To use them, simply import the corresponding module.

## [Overlays](/Overlays-Superpower)
Provides quick overlay creation methods and keeps track of overlays added and removed from the map.


| Service                          | Module                         | Package                                      |
|:--------------------------------:|:------------------------------:|:--------------------------------------------:|
| ⚡ [`OverlaysSuperpower`](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Fsuperpower%2Fservices%2Foverlays-superpower.service.ts&version=GBmaster) | 🧩 `GoogleMapsOverlaysModule` | 📦 `@bespunky/angular-google-maps/overlays` |


## Drawing Manager
NOT YET IMPLEMENTED

# Extending Superpowers
Custom superpowers can empower your maps with new tools. You can easily create your own superpowers and have them accompany every map instance in your app.

## Implementation
Creating superpowers involves 2 simple steps...

1. Create a service for your superpower:

    > The service **must extend** the `Superpower` class and be **injected at the `GoogleMapModule` level** (that's `Map` - singular).

    ```typescript
    import { Injectable } from '@angular/core';
    import { Superpower, GoogleMapModule } from '@bespunky/angular-google-maps/core';
    
    @Injectable({ providedIn: GoogleMapModule }) // <-- 🟢 Must be injected at map level
    export class MagicSuperpower extends Superpower
    {
        constructor(/* Use DI as needed */) { }

        public abracadabra(): void
        {
            // Get a hold of the map and extract the other superpowers as needed
            const overlays = this.map.superpowers.use(OverlaysSuperpower);
    
            // Do the magic...
        }
    }
    ```

2. Charge the superpower into the system:

    Find the proper place to inject `SuperpowersChargerService` and charge the new superpower.
    The best way would be to create a module for the superpower, register the new superpower on construction and import the module in your app:
    ```typescript
    import { NgModule } from '@angular/core';

    import { SuperpowersChargerService } from '@bespunky/angular-google-maps/core';
    import { MagicSuperpower           } from 'path/to/superpower/magic-superpower.service';

    @NgModule(/* any other module config */)
    export class MagicSuperpowerModule
    {
        constructor(charger: SuperpowersChargerService)
        {
            // Use the charger service to register the superpower
            charger.charge(MagicSuperpower);
        }
    }
    ```

    > 🤔 **Why inside a module?**  
    >
    > Modularity and specificity. With a superpower module you can easily implement lazy-loading, and, when you use it in your code, it will be very clear where and when the superpower is imported. See usage below.

## Usage
Using your custom superpower is the same as using a built-in one. Import and fetch...

1. Import the superpower module once in your app:
    ```typescript
    @NgModule({
        ...
        imports: [ ..., MagicSuperpowerModule ]
    })
    export class AppModule { } // Or maybe some lazy loaded module?
    ```

2.  Get a [hold of the map](/Programmatic-Control) and extract the superpower when you need to use it:
    ```typescript
    @Component(...)
    export class MagicalMapComponent implements OnInit
    {    
        @ViewChild('map') private map: GoogleMap;
    
        ngOnInit()
        {
            this.map.superpowers.use(MagicSuperpower).abracadabra();
        }
    }
    ```

    That's it! Pretty neat, right?? 🤟😎

## When should I create my own superpower?
Good candidates for superpowers are:
* Map or geometry related tasks you implement or use repeatedly (e.g. transformations, helpers, etc.).
* Extending map capabilities (e.g. tracking objects, data extraction, etc.).
* Functionalities you can say "should be/have been built-into the map" about.

You could, theoretically, implement map related business logic as a set of superpowers, however those are probably better implemented as [feature components or directives](#See-Also).

# See Also
| Topic                                                    | Description                                   |
|----------------------------------------------------------|-----------------------------------------------|
| [Feature Components](/Best-Practices/Feature-Components) | Best practices for centralizing map features. |