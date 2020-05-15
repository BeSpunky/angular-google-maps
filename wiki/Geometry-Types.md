One of the main goals of `@bespunky/angular-google-maps` is to provide flexibility. Each application has its own requirements and, moreover, each developer has his preferences. For that reason, the library defines the following types and rules:

## Single Coordinates
Coordinates representation will always be done using the `Coord` type. The library will convert it to the corresponding native type if necessary. Coords can take one of the following forms:
```typescript
import { Coord } from '@bespunky/angular-google-maps/core';

// Flat coord array
let coord: Coord = [20, 30]; // [Latitude, Longitude]

// Native google.maps.LatLngLiteral
let coord: Coord = { lat: 20, lng: 30 };

// Native google.maps.LatLng
let coord: Coord = new google.maps.LatLng(20, 30);
