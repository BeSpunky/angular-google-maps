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
The following items are the ones the library user interacts with. Other items can be found in the [Internal Workings](/docs/additional-documentation/internal-workings.html) section and the [source code](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps).

# 📦 `@bespunky/angular-google-maps/core`
| Item                                                            | Purpose                                       | Tools                                                                                                              |
|-----------------------------------------------------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| [Main Module](/docs/additional-documentation/getting-started/manually-loading)                | Bootstraping the library.                     | [🧩`GoogleMapsModule`](/docs/additional-documentation/getting-started/manually-loading)                                                         |
| [Loading Tools](/docs/additional-documentation/getting-started/custom-loader)                 | Providing the loading mechanism for maps api. | [🎫`GoogleMapsApiLoader`](/docs/additional-documentation/getting-started/custom-loader)                                                         |
| [Map Component](/docs/additional-documentation/the-map.html)                                       | Displaying a map and controlling it.          | [⚙`<bs-google-map/>`](/docs/additional-documentation/the-map.html)<br/>[🧬`GoogleMap`](/docs/additional-documentation/the-map.html)<br/>[⚡`SuperpowersService`](/docs/additional-documentation/the-map/superpowers.html) |
| [Superpower Tools](/docs/additional-documentation/the-map/superpowers.html#Extending-Superpowers)  | Extending superpowers.                        | [⚡`SuperpowersChargerService`](/docs/additional-documentation/the-map/superpowers.html#Extending-Superpowers)                                       |
| [Low Level API](/docs/additional-documentation/injectable-services.html#GoogleMapsApiService)      | Low-level operations utils.                   | [💉`GoogleMapsApiService`](/docs/additional-documentation/injectable-services.html#GoogleMapsApiService)                                             |
| [Geometry Tools](/docs/additional-documentation/injectable-services.html#GeometryTransformService) | Geometry work and transformations.            | [💉`GeometryTransformService`](/docs/additional-documentation/injectable-services.html#GeometryTransformService)                                     |
| [Event Tools](/docs/additional-documentation/injectable-services.html#EventDataTransformService)   | Native event data simplification.             | [💉`EventDataTransformService`](/docs/additional-documentation/injectable-services.html#EventDataTransformService)                                   |

# 📦 `@bespunky/angular-google-maps/async`

| Item                                                       | Purpose                                                    | Tools                                                                      |
|------------------------------------------------------------|------------------------------------------------------------|----------------------------------------------------------------------------|
| [Async Module](/docs/additional-documentation/getting-started/plug-n-play-async-loading) | Automating maps api loading and bootstrapping the library. | [🧩`GoogleMapsModule`](/docs/additional-documentation/getting-started/plug-n-play-async-loading)        |
| [Lazy Loader](/docs/additional-documentation/getting-started/plug-n-play-async-loading)  | Lazy loading google maps api.                              | [💉`LazyGoogleMapsApiLoader`](/docs/additional-documentation/getting-started/plug-n-play-async-loading) |
| [Safe Render](/docs/additional-documentation/the-map/*bsSafe)                            | Rendering maps only when api is ready.                     | [⚙`*bsSafe`](/docs/additional-documentation/the-map/*bsSafe)                                            |

# 📦 `@bespunky/angular-google-maps/overlays`
| Item                                                  | Purpose                                                    | Tools                                                                                                                                                                  |
|-------------------------------------------------------|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Overlays Module](/docs/additional-documentation/overlays-superpower.html)               | Automating maps api loading and bootstrapping the library. | [🧩`GoogleMapsModule`](/docs/additional-documentation/overlays-superpower.html)                                                                                                                          |
| [Superpower](/docs/additional-documentation/overlays-superpower.html#The-Superpower)     | Facilitating work with overlays and geometry.              | [⚡`OverlaysSuperpower`<br/>⚡`OvelraysTracker`<br/>⚙`OverlaysDirective`](/docs/additional-documentation/overlays-superpower.html#The-Superpower)                                                       |
| [Marker Overlay](/docs/additional-documentation/overlays-superpower/markers.html)        | Rendering markers on the map.                              | [⚙`<bs-google-maps-marker>`<br/>🧬`GoogleMapsMarker`<br/>](/docs/additional-documentation/overlays-superpower/markers.html)                                                                             |
| [Polygon Overlay](/docs/additional-documentation/overlays-superpower/polygons.html)      | Rendering polygons on the map.                             | [⚙`<bs-google-maps-polygon>`<br/>🧬`GoogleMapsPolygon`<br/>](/docs/additional-documentation/overlays-superpower/polygons.html)                                                                          |
| [Circle Overlay](/docs/additional-documentation/overlays-superpower/circles.html)      | Rendering circles on the map.                             | [⚙`<bs-google-maps-circle>`<br/>🧬`GoogleMapsCircle`<br/>](/docs/additional-documentation/overlays-superpower/circles.html)                                                                          |
| [Data Layer Overlay](/docs/additional-documentation/overlays-superpower/data-layer.html) | Rendering geometries and GeoJsons on the map.              | [⚙`<bs-google-maps-data>`<br/>🧬`GoogleMapsData`<br/>⚙`<bs-google-maps-feature>`<br/>🧬`GoogleMapsFeature`<br/>💉`FeatureTracker`](/docs/additional-documentation/overlays-superpower/data-layer.html) |
| [Info Window Overlay](/docs/additional-documentation/overlays-superpower/info-windows.html)      | Rendering info windows on the map.                             | [⚙`<bs-google-maps-info-window>`<br/>🧬`GoogleMapsInfoWindow`<br/>](/docs/additional-documentation/overlays-superpower/info-windows.html)           |

# 🧪 `@bespunky/angular-google-maps/testing`
| Item                                                                                                                                                                                            | Purpose                                        | Tools                                |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|--------------------------------------|
| [Expectation Utils](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Ftesting%2Fhelpers%2Fexpectations.ts&version=GBmaster) | Facilitating expectations with geometry types. | ∱`expectPositionEquals`             |
| [Setup](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Ftesting%2Fhelpers%2Fsetup.ts&version=GBmaster)                    | Facilitating setup for map related tests.      | ∱`configureGoogleMapsTestingModule` |

# 🧪 `@bespunky/angular-google-maps/core/testing`
| Item                                                                                                                                                                                                                        | Purpose                                            | Tools                                                                                                                                                                                          |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Mocks](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Ftesting%2Fmocks&version=GBmaster)                                                      | Facilitating mocking of library classes.           | 💉`MockNative`<br/>💉`MockWrapper`<br/>💉`MockEmittingWrapper`<br/>💉`MockComponentWithLifecycle`<br/>💉`MockGoogleMap`<br/>💉`MockSuperpower1`<br/>💉`MockSuperpower2`<br/>💉`MockBounds` |
| [Wrapper Testing](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Ftesting%2Fhelpers%2Fwrapper-factory-provider-test-setup.ts&version=GBmaster) | Facilitating testing of wrapper factories.         | ∱`itShouldCreateWrapper`                                                                                                                                                                      |
| [Lifecycle Testing](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Ftesting%2Fhelpers%2Flifecycle-components.ts&version=GBmaster)              | Facilitating testing of components with lifecycle. | 💉`LifecycleComponentTestHost`<br/>∱`createLifecycleTestingHostComponentTemplate`                                                                                                             |
| [Geometry Testing](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Ftesting%2Fhelpers%2Fgeometry-spec-production.ts&version=GBmaster)           | Facilitating testing of geometry flexibility.      | ∱`produceCoordSpecs`<br/>∱`produceSinglePathSpecs`<br/>∱`produceMultiPathSpecs`<br/>∱`producePathSpecs`<br/>∱`produceIBoundsSpecs`<br/>∱`produceDataGeometrySpecs`<br/>∱`produceBoundsLikeSpecs`<br/>                      |
| [Geometry Expectation Utils](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Ftesting%2Fhelpers%2Fgeometry-expectations.ts&version=GBmaster)    | Facilitating expectation of geometry values.       | ∱`expectCoord`<br/>∱`expectPath`<br/>∱`expectBounds`<br/>                                                                                                                                     |

# 🧪 `@bespunky/angular-google-maps/async/testing`
| Item                                                                                                                                                                                 | Purpose                                                      | Tools                                |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|--------------------------------------|
| [Setup](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fasync%2Ftesting%2Fhelpers%2Fsetup.ts&version=GBmaster) | Facilitating setup for map related tests with async loading. | ∱`configureGoogleMapsTestingModule` |

# 🧪 `@bespunky/angular-google-maps/overlays/testing`
| Item                                                                                                                                                                       | Purpose                                          | Tools                                                                                                                |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| [Mocks](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Ftesting%2Fmocks&version=GBmaster) | Facilitating mocking of library overlay classes. | 💉`MockNativeDrawableOverlay`<br/>💉`MockDrawableOverlay`<br/>💉`MockMarker`<br/>💉`MockData`<br/>💉`MockFeature` |

# Next Steps
| Topic                               | Description            |
|-------------------------------------|------------------------|
| [Getting Started](/docs/additional-documentation/getting-started) | Create your first map. |
