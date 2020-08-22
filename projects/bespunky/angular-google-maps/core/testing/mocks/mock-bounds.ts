import { IBounds } from '@bespunky/angular-google-maps/core';

export class MockBounds implements IBounds
{
    /** Enables setting the bounds to whatever. */
    public bounds: google.maps.LatLngBounds;

    getBounds(): google.maps.LatLngBounds
    {
        return new google.maps.LatLngBounds()
    }
}