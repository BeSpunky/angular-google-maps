import { BoundsLike, NativeCoord } from '@bespunky/angular-google-maps/core';

/** Represents the supported directions place forms of Google Maps API. */
export type NativeDirectionsPlace = string | NativeCoord | google.maps.Place;
/** Represents the directions place forms supported by the library. */
export type DirectionsPlace       = NativeDirectionsPlace | DirectionsWaypoint | BoundsLike;

/** Represents the supported directions waypoint forms of Google Maps API. */
export type NativeDirectionsWaypoint = google.maps.DirectionsWaypoint;
/** Represents the directions waypoint forms supported by the library. */
export type DirectionsWaypoint       = NativeDirectionsWaypoint | Omit<NativeDirectionsWaypoint, 'location'> & {
    /**
    * The place this waypoint points to.
    *
    * @type {DirectionsPlace}
    */
    location?: DirectionsPlace
};