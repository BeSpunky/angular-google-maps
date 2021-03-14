import { GoogleMapsNativeObjectEmittingWrapper, GoogleMapsApiService, IGoogleMap } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';
import { IGoogleMapsDrawableOverlay       } from './i-google-maps-drawable-overlay';
import { OverlayType                      } from './overlay-type.enum';

export abstract class GoogleMapsDrawableOverlay<TNative extends IGoogleMapsNativeDrawableOverlay>
                extends GoogleMapsNativeObjectEmittingWrapper<TNative>
                implements IGoogleMapsDrawableOverlay<TNative>
{
    constructor(public readonly type: OverlayType, public map: IGoogleMap, api: GoogleMapsApiService, native: TNative)
    {
        super(api, native);

        this.attach(map);
    }

    /**
     * Assigns the overlay to the specified map. If possible, prefer using the appropriate `GoogleMap.createXXX()` method instead.
     * If not possible, it is the responsability of the caller to add the overlay to the `OverlayTracker` in the `GoogleMap.overlays` object.
     * Otherwise, inconsistencies and unexpected behaviours might occur.
     *
     * @param {IGoogleMap} map The map to dispaly the overlay on.
     */
    public attach(map: IGoogleMap): void
    {
        this.map = map;

        this.setNativeMapOutside(map.native);
    }

    /**
     * Removes the overlay from the map it is attached to. If possible, prefer using the `GoogleMap.removeOverlay()` method instead.
     * If not possible, it is the responsability of the caller to remove the overlay from the `OverlayTracker` in the `GoogleMap.overlays` object.
     * Otherwise, inconsistencies and unexpected behaviours might occur.
     */
    public detach(): void
    {
        this.map = null;

        this.setNativeMapOutside(null);
    }

    private setNativeMapOutside(map: google.maps.Map)
    {
        this.api.runOutsideAngular(() => this.native.setMap(map));
    }

    public abstract getBounds(): google.maps.LatLngBounds;
}
