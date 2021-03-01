import { BoundsLike, NativeCoord } from '@bespunky/angular-google-maps/core';

export type NativeDirectionsPlace = string | NativeCoord | google.maps.Place;
export type DirectionsPlace       = string | google.maps.Place | BoundsLike;
