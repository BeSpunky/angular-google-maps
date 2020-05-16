# The name of the game: Flexibility
Each application has its own requirements and, more importantly, every developer has his/her preferences. For that reason, `@bespunky/angular-google-maps` defines new types, usually as a union of existing types.

Your interaction with the library (e.g. passing arguments, binding, etc.) will always be through those new types. The library will take care of conversions for you when needed.

**Bottom line:**  
Forget about having to manually convert your objects to the specific type required by Google Maps API. 🤟😎

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

# Paths
A set of coordinates describing a path (e.g. for polygons, polylines, etc.) will always be done using the `CoordPath` type.

## Single Paths
These may be expressed as an array of [`Coord`](#single-coordinates), or a native `google.maps.MVCArray`. Single paths can take one of the following forms:

```typescript
import { CoordPath } from '@bespunky/angular-google-maps/core'

// Flat coords path array
const path: CoordPath = [
    [1, 1],
    [2, 2],
    [3, 3]
];

// Native google.maps.LatLngLiteral[]
const path: CoordPath = [
    { lat: 1, lng: 1 },
    { lat: 2, lng: 2 },
    { lat: 3, lng: 3 }
];

// Native google.maps.LatLng[]
const path: CoordPath = [
    new google.maps.LatLng(1, 1),
    new google.maps.LatLng(2, 2),
    new google.maps.LatLng(3, 3)
];

// Native google.maps.MVCArray
const path: CoordPath = new google.maps.MVCArray([
    { lat: 1, lng: 1 },
    { lat: 2, lng: 2 },
    { lat: 3, lng: 3 }
]);

const path: CoordPath = new google.maps.MVCArray([
    new google.maps.LatLng(1, 1),
    new google.maps.LatLng(2, 2),
    new google.maps.LatLng(3, 3)
]);
```
## Multi Paths
These may be expressed as 2D arrays of [`Coord`](#single-coordinates), or a 2D native `google.maps.MVCArray`. Multi paths can take one of the following forms:

```typescript
import { CoordPath } from '@bespunky/angular-google-maps/core'

// Flat coords path array
const path: CoordPath = [
    [ [1, 1], [2, 2], [3, 3] ],
    [ [4, 4], [5, 5], [6, 6] ]
];

// Native google.maps.LatLngLiteral[][]
const path: CoordPath = [
    [{ lat: 1, lng: 1 }, { lat: 2, lng: 2 }, { lat: 3, lng: 3 }],
    [{ lat: 4, lng: 4 }, { lat: 5, lng: 5 }, { lat: 6, lng: 6 }]
];

// Native google.maps.LatLng[][]
const path: CoordPath = [
    [new google.maps.LatLng(1, 1), new google.maps.LatLng(2, 2), new google.maps.LatLng(3, 3)],
    [new google.maps.LatLng(4, 4), new google.maps.LatLng(5, 5), new google.maps.LatLng(6, 6)]
];

// Native google.maps.MVCArray<google.maps.MVCArray>
const path: CoordPath = new google.maps.MVCArray([
    new google.maps.MVCArray([ { lat: 1, lng: 1 }, { lat: 2, lng: 2 }, { lat: 3, lng: 3 } ]),
    new google.maps.MVCArray([ { lat: 4, lng: 4 }, { lat: 5, lng: 5 }, { lat: 6, lng: 6 } ])
]);

const path: CoordPath = new google.maps.MVCArray([
    new google.maps.MVCArray([new google.maps.LatLng(1, 1), new google.maps.LatLng(2, 2), new google.maps.LatLng(3, 3)]),
    new google.maps.MVCArray([new google.maps.LatLng(4, 4), new google.maps.LatLng(5, 5), new google.maps.LatLng(6, 6)])
]);
```

# See Also
| Topic | Description |
| ----- | ----------- |
|[GeometryTransformService](/Injectable-Services/GeometryTransformService)|Easily construct and convert geometry types.|