# Legend

    🧩 Modules

    ⚙ Components or directive

    🧬 Native object wrappers

    💉 Services or helper classes

    ⚡ Superpower services

    🎫 Tokens and providers
</div>

# Packages

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

| Item         | Purpose                                                    | Tools                        |
|--------------|------------------------------------------------------------|------------------------------|
| Async Module | Automating maps api loading and bootstrapping the library. | 🧩`GoogleMapsModule`        |
| Lazy Loader  | Lazy loading google maps api.                              | 💉`LazyGoogleMapsApiLoader` |
| Safe         | Rendering maps only when api is ready.                     | ⚙`*bsSafe`                  |

