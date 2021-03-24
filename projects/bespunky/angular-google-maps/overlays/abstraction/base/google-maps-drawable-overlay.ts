import { GoogleMapsNativeObjectEmittingWrapper, GoogleMapsApiService, IGoogleMap } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';
import { IGoogleMapsDrawableOverlay       } from './i-google-maps-drawable-overlay';
import { OverlayType                      } from './overlay-type.enum';

/**
 * Provides the base functionality for wrapper objects which wrap a native overlay object. Wrappers like `GoogleMapsPolygon`, `GoogleMapsMarker` etc. should extend this class.
 *
 * @export
 * @abstract
 * @class GoogleMapsDrawableOverlay
 * @extends {GoogleMapsNativeObjectEmittingWrapper<TNative>}
 * @implements {IGoogleMapsDrawableOverlay<TNative>}
 * @template TNative The type of drawable overlay being wrapped.
 */
export abstract class GoogleMapsDrawableOverlay<TNative extends IGoogleMapsNativeDrawableOverlay>
                extends GoogleMapsNativeObjectEmittingWrapper<TNative>
                implements IGoogleMapsDrawableOverlay<TNative>
{
    /**
     * Creates an instance of GoogleMapsDrawableOverlay.
     * 
     * @param {OverlayType} type The type of overlay this wrapper holds. Used by the `OverlayTracker` to distinguish between types.
     * @param {IGoogleMap} map The map to which this overlay should be added.
     * @param {GoogleMapsApiService} api The instance of the low-level api.
     * @param {TNative} native The native overlay to wrap.
     */
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
