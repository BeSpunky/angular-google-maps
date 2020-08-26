# The name of the game: Flexibility
Every application has its own requirements and, more importantly, every developer has his/her preferences. For that reason, `@bespunky/angular-google-maps` defines new types, usually as a union of existing types.

Your interaction with the library (e.g. passing arguments, binding, etc.) will always be through those new types. The library will take care of conversions for you when needed.

**Bottom line:**  
Forget about having to manually convert your objects to the specific type required by Google Maps API. 🤟😎

**TLDR** Instead of reading and memorizing types, try and pass your types around to the library's methods. If you're thinking a method should receive your object type, it probably does. If it doesn't, contact me.

[Live demo](https://bs-angular-ggl-maps-demo.web.app/Injectable%20Services/GeometryTransformService) | [Source code](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fabstraction%2Ftypes%2Fgeometry.type.ts&version=GBmaster)

[[_TOC_]]
# Single Coordinates
Coordinates representation will always be done using the `Coord` type. Coords can take one of the following forms:
```typescript
import { Coord } from '@bespunky/angular-google-maps/core';

// Flat coord array [Latitude, Longitude]
const coord: Coord = [20, 30];

// Native google.maps.LatLngLiteral
const coord: Coord = { lat: 20, lng: 30 };

// Native google.maps.LatLng
const coord: Coord = new google.maps.LatLng(20, 30);
```

[Live demo](https://bs-angular-ggl-maps-demo.web.app/Geometry%20Types/Single%20Coord)

# Paths
A set of coordinates describing a path (e.g. for polygons, polylines, etc.) will always be done using the `CoordPath` type.

## Single Paths
These may be expressed as an array of [`Coord`](#single-coordinates), or a native `google.maps.MVCArray`. Single paths can take one of the following forms:

```typescript
import { Path } from '@bespunky/angular-google-maps/core'

// Flat coords path array
const path: Path = [
    [1, 1],
    [2, 2],
    [3, 3]
];

// Native google.maps.LatLngLiteral[]
const path: Path = [
    { lat: 1, lng: 1 },
    { lat: 2, lng: 2 },
    { lat: 3, lng: 3 }
];

// Native google.maps.LatLng[]
const path: Path = [
    new google.maps.LatLng(1, 1),
    new google.maps.LatLng(2, 2),
    new google.maps.LatLng(3, 3)
];

// Native google.maps.MVCArray<google.maps.LatLngLiteral>
const path: Path = new google.maps.MVCArray([
    { lat: 1, lng: 1 },
    { lat: 2, lng: 2 },
    { lat: 3, lng: 3 }
]);

// Native google.maps.MVCArray<google.Maps.LatLng>
const path: Path = new google.maps.MVCArray([
    new google.maps.LatLng(1, 1),
    new google.maps.LatLng(2, 2),
    new google.maps.LatLng(3, 3)
]);

// Native google.maps.Data.LinearRing
const path: Path = new google.maps.Data.LinearRing([
    { lat: 1, lng: 2 },
    { lat: 3, lng: 4 },
    { lat: 5, lng: 6 }
]);
```

[Live demo](https://bs-angular-ggl-maps-demo.web.app/Geometry%20Types/Single%20Paths)

## Multi Paths
These may be expressed as 2D arrays of [`Coord`](#single-coordinates), data layer linear rings, or a 2D native `google.maps.MVCArray`. Multi paths can take one of the following forms:

```typescript
import { MultiPath } from '@bespunky/angular-google-maps/core'

// Flat coords path array
const path: MultiPath = [
    [ [1, 1], [2, 2], [3, 3] ],
    [ [4, 4], [5, 5], [6, 6] ]
];

// Native google.maps.LatLngLiteral[][]
const path: MultiPath = [
    [{ lat: 1, lng: 1 }, { lat: 2, lng: 2 }, { lat: 3, lng: 3 }],
    [{ lat: 4, lng: 4 }, { lat: 5, lng: 5 }, { lat: 6, lng: 6 }]
];

// Native google.maps.LatLng[][]
const path: MultiPath = [
    [new google.maps.LatLng(1, 1), new google.maps.LatLng(2, 2), new google.maps.LatLng(3, 3)],
    [new google.maps.LatLng(4, 4), new google.maps.LatLng(5, 5), new google.maps.LatLng(6, 6)]
];

// Native google.maps.Data.LinearRing[]
const path: MultiPath = [
    new google.maps.Data.LinearRing([{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }, { lat: 5, lng: 6 } ]),
    new google.maps.Data.LinearRing([{ lat: 7, lng: 8 }, { lat: 9, lng: 10 }, { lat: 11, lng: 12 } ])
];

// Native google.maps.MVCArray
const path: MultiPath = new google.maps.MVCArray([
    new google.maps.Data.LinearRing([{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }, { lat: 5, lng: 6 } ]),
    new google.maps.Data.LinearRing([{ lat: 7, lng: 8 }, { lat: 9, lng: 10 }, { lat: 11, lng: 12 } ])
]);

const path: MultiPath = new google.maps.MVCArray([
    new google.maps.MVCArray([ { lat: 1, lng: 1 }, { lat: 2, lng: 2 }, { lat: 3, lng: 3 } ]),
    new google.maps.MVCArray([ { lat: 4, lng: 4 }, { lat: 5, lng: 5 }, { lat: 6, lng: 6 } ])
]);

const path: MultiPath = new google.maps.MVCArray([
    new google.maps.MVCArray([new google.maps.LatLng(1, 1), new google.maps.LatLng(2, 2), new google.maps.LatLng(3, 3)]),
    new google.maps.MVCArray([new google.maps.LatLng(4, 4), new google.maps.LatLng(5, 5), new google.maps.LatLng(6, 6)])
]);
```
[Live demo](https://bs-angular-ggl-maps-demo.web.app/Geometry%20Types/Multi%20Paths)

# Bounds
One of the main uses of bounds is centering the map and zooming it on a specific element(s). You may use any of the following to define the bounds for your elements:
```typescript
import { NativeBounds } from '@bespunky/angular-google-maps/core'

// Native google.maps.LatLngBoundsLiteral
const bounds: NativeBounds = { south: 1, east: 2, north: 3, west: 4 };

// Native google.maps.LatLngBounds
const bounds: NativeBounds = new google.maps.LatLngBounds({ lat: 1, lng: 2 }, { lat: 3, lng: 4 });
```

#### IBounds
Any object which implements the `IBounds` interface from the `core` module can also be used with bounds handling methods in the library.
Overlay objects (e.g. markers, polygons...) implement it internally so you can simply pass them to a method like `fitBounds()` without any preprocessing.

You can implement IBounds as needed in your objects as well.

[Live demo](https://bs-angular-ggl-maps-demo.web.app/Geometry%20Types/Bounds)

# Interchangeability

| Type           | Can hold any                                                  |
|----------------|---------------------------------------------------------------|
| `Path`         | `Coord`                                                       |
| `MultiPath`    | `Path`                                                        |
| `CoordPath`    | `Path`, `MultiPath`                                           |
| `NativeBounds` | `google.maps.LatLngBoundsLiteral`, `google.maps.LatLngBounds` |
| `BoundsLike`   | `Coord`, `CoordPath`, `NativeBounds`, `IBounds`               |


[Live demo](https://bs-angular-ggl-maps-demo.web.app/Injectable%20Services/GeometryTransformService) | [Source code](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fabstraction%2Ftypes%2Fgeometry.type.ts&version=GBmaster)


# See Also
| Topic                                                                                                                                                                                                                     | Description                                  |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| [GeometryTransformService](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fapi%2Ftransform%2Fgeometry-transform.service.ts&version=GBmaster) | Easily construct and convert geometry types. |