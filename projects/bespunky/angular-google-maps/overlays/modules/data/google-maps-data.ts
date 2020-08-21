import { GoogleMapsApiService, NativeObjectWrapper, IGoogleMap, OutsideAngular, Coord, CoordPath, WrappedNativeFunctions, Delegation } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay  } from '../../abstraction/base/google-maps-drawable-overlay';
import { OverlayType                } from '../../abstraction/base/overlay-type.enum';
import { isGoogleMapsFeatureOptions } from '../../abstraction/type-guards/feature-options-type-guard';
import { IGoogleMapsData            } from './i-google-maps-data';
import { IGoogleMapsFeature         } from './feature/i-google-maps-feature';
import { GoogleMapsFeature          } from './feature/google-maps-feature';
import { FeatureTracker             } from './services/feature-tracker';

export type WrappedDataFunctions = WrappedNativeFunctions<google.maps.Data, 'add' | 'addGeoJson' | 'getFeatureById' | 'toGeoJson' | 'loadGeoJson' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

export interface GoogleMapsData extends WrappedDataFunctions { }

// @dynamic
@NativeObjectWrapper<google.maps.Data, GoogleMapsData>({
    getMap: Delegation.Exclude,
    setMap: Delegation.Exclude
})
export class GoogleMapsData extends GoogleMapsDrawableOverlay<google.maps.Data> implements IGoogleMapsData
{
    public readonly features = new FeatureTracker();

    constructor(api: GoogleMapsApiService, public map: IGoogleMap, options?: google.maps.Data.DataOptions)
    {
        super(api, map, OverlayType.Data, options);
    }

    protected createNativeObject(options?: google.maps.Data.DataOptions): google.maps.Data
    {
        return new google.maps.Data(options);
    }

    public getBounds(): google.maps.LatLngBounds
    {
        return this.api.geometry.defineBounds(...this.features.list.map(feature => feature.getBounds()));
    }

    @OutsideAngular
    public createMarker(position: Coord, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        options = this.buildOptions(this.api.geometry.createDataPoint(position), options);

        return this.addFeature(options);
    }

    @OutsideAngular
    public createPolygon(path: CoordPath, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        options = this.buildOptions(this.api.geometry.createDataPolygon(path), options);

        return this.addFeature(options);
    }

    private buildOptions(geometry: google.maps.Data.Geometry, baseOptions?: google.maps.Data.FeatureOptions): google.maps.Data.FeatureOptions
    {
        return Object.assign({}, baseOptions, { geometry });
    }

    public addFeature(feature: IGoogleMapsFeature): IGoogleMapsFeature;
    public addFeature(options: google.maps.Data.FeatureOptions): IGoogleMapsFeature;
    @OutsideAngular
    public addFeature(feature: google.maps.Data.FeatureOptions | IGoogleMapsFeature): IGoogleMapsFeature
    {
        if (isGoogleMapsFeatureOptions(feature))
            feature = new GoogleMapsFeature(this.api, this, feature);

        this.native.add(feature.native);
        this.features.add(feature);

        return feature;
    }

    public removeFeature(feature: google.maps.Data.Feature): IGoogleMapsFeature;
    public removeFeature(feature: IGoogleMapsFeature): IGoogleMapsFeature;
    public removeFeature(featureId: string | number): IGoogleMapsFeature;
    @OutsideAngular
    public removeFeature(featureOrId: string | number | google.maps.Data.Feature | IGoogleMapsFeature): IGoogleMapsFeature
    {
        const removed = this.features.remove(featureOrId);

        if (removed)
            this.native.remove(removed.native);

        return removed;
    }

    public findFeature(id: string | number): google.maps.Data.Feature { return this.native.getFeatureById(id); }

    public toGeoJson(): Promise<any>
    {
        return new Promise(resolve => this.native.toGeoJson(resolve));
    }

    @OutsideAngular
    public loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>
    {
        return new Promise(resolve => this.native.loadGeoJson(url, options, resolve));
    }
}