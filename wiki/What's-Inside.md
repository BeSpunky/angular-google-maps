# Legend

    🧩 Modules

    ⚙ Components or directive

    🧬 Native object wrappers

    💉 Services or helper classes

    ⚡ Superpower services

    🎫 Tokens and providers

    ∱  Helper functions
</div>

[[_TOC_]]

# Packages
The following items are the ones the library user interacts with. Other items can be found in the [Internal Workings](/Internal-Workings) section and the [source code](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps).

# 📦 `@bespunky/angular-google-maps/core`
| Item                                                            | Purpose                                       | Tools                                                                                                              |
|-----------------------------------------------------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| [Main Module](/Getting-Started/Manually-Loading)                | Bootstraping the library.                     | [🧩`GoogleMapsModule`](/Getting-Started/Manually-Loading)                                                         |
| [Loading Tools](/Getting-Started/Providing-A-Loader)            | Providing the loading mechanism for maps api. | [🎫`GoogleMapsApiLoader`](/Getting-Started/Providing-A-Loader)                                                    |
| [Map Component](/The-Map)                                       | Displaying a map and controlling it.          | [⚙`<bs-google-map/>`](/The-Map)<br/>[🧬`GoogleMap`](/The-Map)<br/>[⚡`SuperpowersService`](/The-Map/Superpowers) |
| [Superpower Tools](/The-Map/Superpowers#Extending-Superpowers)  | Extending superpowers.                        | [⚡`SuperpowersChargerService`](/The-Map/Superpowers#Extending-Superpowers)                                       |
| [Low Level API](/Injectable-Services#GoogleMapsApiService)      | Low-level operations utils.                   | [💉`GoogleMapsApiService`](/Injectable-Services#GoogleMapsApiService)                                             |
| [Geometry Tools](/Injectable-Services#GeometryTransformService) | Geometry work and transformations.            | [💉`GeometryTransformService`](/Injectable-Services#GeometryTransformService)                                     |
| [Event Tools](/Injectable-Services#EventDataTransformService)   | Native event data simplification.             | [💉`EventDataTransformService`](/Injectable-Services#EventDataTransformService)                                   |

# 📦 `@bespunky/angular-google-maps/async`

| Item                                                | Purpose                                                    | Tools                                                               |
|-----------------------------------------------------|------------------------------------------------------------|---------------------------------------------------------------------|
| [Async Module](/Getting-Started/Auto-Async-Loading) | Automating maps api loading and bootstrapping the library. | [🧩`GoogleMapsModule`](/Getting-Started/Auto-Async-Loading)        |
| [Lazy Loader](/Getting-Started/Auto-Async-Loading)  | Lazy loading google maps api.                              | [💉`LazyGoogleMapsApiLoader`](/Getting-Started/Auto-Async-Loading) |
| [Safe Render](/The-Map/*bsSafe)                     | Rendering maps only when api is ready.                     | [⚙`*bsSafe`](/The-Map/*bsSafe)                                     |

# 📦 `@bespunky/angular-google-maps/overlays`
| Item                                                  | Purpose                                                    | Tools                                                                                                                                                                  |
|-------------------------------------------------------|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Overlays Module](/Overlays-Superpower)               | Automating maps api loading and bootstrapping the library. | [🧩`GoogleMapsModule`](/Overlays-Superpower)                                                                                                                          |
| [Superpower](/Overlays-Superpower#The-Superpower)     | Facilitating work with overlays and geometry.              | [⚡`OverlaysSuperpower`<br/>⚡`OvelraysTracker`<br/>⚙`OverlaysDirective`](/Overlays-Superpower#The-Superpower)                                                       |
| [Marker Overlay](/Overlays-Superpower/Markers)        | Rendering markers on the map.                              | [⚙`<bs-google-maps-marker>`<br/>🧬`GoogleMapsMarker`<br/>](/Overlays-Superpower/Markers)                                                                             |
| [Polygon Overlay](/Overlays-Superpower/Polygons)      | Rendering polygons on the map.                             | [⚙`<bs-google-maps-polygon>`<br/>🧬`GoogleMapsPolygon`<br/>](/Overlays-Superpower/Polygons)                                                                          |
| [Data Layer Overlay](/Overlays-Superpower/Data-Layer) | Rendering geometries and GeoJsons on the map.              | [⚙`<bs-google-maps-data>`<br/>🧬`GoogleMapsData`<br/>⚙`<bs-google-maps-feature>`<br/>🧬`GoogleMapsFeature`<br/>💉`FeatureTracker`](/Overlays-Superpower/Data-Layer) |

# 🧪 `@bespunky/angular-google-maps/testing`
| Item              | Purpose                                        | Tools                                |
|-------------------|------------------------------------------------|--------------------------------------|
| Expectation Utils | Facilitating expectations with geometry types. | ∱`expectPositionEquals`             |
| Setup             | Facilitating setup for map related tests.      | ∱`configureGoogleMapsTestingModule` |

# 🧪 `@bespunky/angular-google-maps/core/testing`
| Item              | Purpose                                            | Tools                                                                                                                                                                            |
|-------------------|----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Mocks             | Facilitating mocking of library classes.           | 💉`MockNative`<br/>💉`MockWrapper`<br/>💉`MockEmittingWrapper`<br/>💉`MockComponentWithLifecycle`<br/>💉`MockGoogleMap`<br/>💉`MockSuperpower1`<br/>💉`MockSuperpower2`<br/> |
| Wrapper Testing   | Facilitating testing of wrapper factories.         | ∱`itShouldCreateWrapper`                                                                                                                                                        |
| Lifecycle Testing | Facilitating testing of components with lifecycle. | 💉`LifecycleComponentTestHost`<br/>∱`createLifecycleTestingHostComponentTemplate`                                                                                               |

# 🧪 `@bespunky/angular-google-maps/async/testing`
| Item  | Purpose                                                      | Tools                                |
|-------|--------------------------------------------------------------|--------------------------------------|
| Setup | Facilitating setup for map related tests with async loading. | ∱`configureGoogleMapsTestingModule` |

# 🧪 `@bespunky/angular-google-maps/overlays/testing`
| Item  | Purpose                                                      | Tools                                                                                                                |
|-------|--------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Setup | Facilitating setup for map related tests with async loading. | ∱`configureGoogleMapsTestingModule`                                                                                 |
| Mocks | Facilitating mocking of library overlay classes.             | 💉`MockNativeDrawableOverlay`<br/>💉`MockDrawableOverlay`<br/>💉`MockMarker`<br/>💉`MockData`<br/>💉`MockFeature` |