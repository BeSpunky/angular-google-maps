import { GeometryTransformService } from '@bespunky/angular-google-maps/core';
import { DirectionsPlace, DirectionsTransformService } from '@bespunky/angular-google-maps/directions';

const transform = new DirectionsTransformService(new GeometryTransformService());

export function expectPlace(place: DirectionsPlace, expected: DirectionsPlace)
{
    if (place instanceof google.maps.LatLng)
        expectPlace(place.toJSON(), expected);
    else if (transform.isNativePlaceObject(place) && place.location instanceof google.maps.LatLng)
        expectPlace({ ...place, location: place.location.toJSON() }, expected);
    else if (expected instanceof google.maps.LatLng)
        expectPlace(place, expected.toJSON());
    else if (transform.isNativePlaceObject(expected) && expected.location instanceof google.maps.LatLng)
        expectPlace(place, { ...expected, location: expected.location.toJSON() });
    else
        expect(place).toEqual(expected);
}