import { BoundsLike, NativeCoord } from '@bespunky/angular-google-maps/core';

export type NativeDirectionsPlace = string | NativeCoord | google.maps.Place;
export type DirectionsPlace       = NativeDirectionsPlace | DirectionsWaypoint | BoundsLike;

export type NativeDirectionsWaypoint = google.maps.DirectionsWaypoint;
export type DirectionsWaypoint       = NativeDirectionsWaypoint | Omit<NativeDirectionsWaypoint, 'location'> & {
    /**
    * The place this waypoint points to.
    *
    * @type {DirectionsPlace}
    */
    location?: DirectionsPlace
};