# Tools
| Package 📦  | `@bespunky/angular-google-maps/overlays` |
|--------------|------------------------------------------|
| Directive ⚙ | `<bs-google-maps-data/>`                 |
| Wrapper 🧬  | `GoogleMapsData`                         |

Name for template reference variables: `dataLayer`

[Wrapper API](/docs/classes/GoogleMapsData.html) | [Directive API](/docs/directives/GoogleMapsDataDirective.html) | [Live Demo](https://bs-angular-g-maps.web.app/Overlays%20Superpower/Data%20Layer)

# Concepts
The data layer is [different to the rest of the overlays](/docs/additional-documentation/overlays-superpower.html#data-layer-vs-normal-overlays). It doesn't do much on its own, and is meant to be used in conjunction with [geometry features](/docs/additional-documentation/overlays-superpower/data-layer/geometry-features.html).

You must either place geometry feature directives inside of the data directive or use the wrapper to create the features.

## Feature Events
The native data layer object raises events for features it holds, which in turn means you'd have to find out which feature raised the event. `<bs-google-maps-data/>` and `<bs-google-maps-feature>` play nicely together to bridge this. See [Geometry Features](/docs/additional-documentation/overlays-superpower/data-layer/geometry-features.html).

## Feature Tracking
<small>[How do I access the wrapper?](/docs/additional-documentation/programmatic-control.html)</small>

The wrapper implements feature tracking automatically. Access tracked features using the `features` property:
```typescript
const data = ... // Fetch the data layer wrapper

const yourFeatures = data.features.list; // GoogleMapsFeature[]
```

> Unlike [overlay tracker](/docs/additional-documentation/overlays-superpower.html#overlay-tracking), the features tracker doesn't provide a `changes` observable. That is because the native data layer already provides events for detecting changes. Bind your `<bs-google-maps-data>` directive's `addFeature` and `removeFeature` events and you'll get the same result. [See demo](https://bs-angular-g-maps.web.app/Overlays%20Superpower/Data%20Layer) for more details.

# Subject to Change
As with feature events, `@bespunky/angular-google-maps` aspires bridging the gap between the native data object and the native feature objects it holds. So feature styling and other tasks are about to become a lot easier. 

Stay tuned for new versions and breaking changes...

# See Also

| Topic                             | Description                 |
|-----------------------------------|-----------------------------|
| [Geometry Types](/docs/additional-documentation/geometry-types.html) | Flexibility for geometries. |