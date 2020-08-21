import { IGoogleMap, Coord, CoordPath, NativeObjectWrapper, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsData, IGoogleMapsFeature                                       } from '@bespunky/angular-google-maps/overlays';
import { MockDrawableOverlay                                                       } from '../mock-drawable-overlay';

export type WrappedDataFunctions = WrappedNativeFunctions<google.maps.Data, 'add' | 'addGeoJson' | 'getFeatureById' | 'toGeoJson' | 'loadGeoJson' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

export interface MockGoogleMapsData extends WrappedDataFunctions { }

// @dynamic
@NativeObjectWrapper<google.maps.Data, MockGoogleMapsData>()
export class MockGoogleMapsData extends MockDrawableOverlay<google.maps.Data> implements IGoogleMapsData
{
    constructor(public map: IGoogleMap)
    {
        super(map, new google.maps.Data());
    }

    createMarker(position: Coord, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        throw new Error("Method not implemented.");
    }
    createPolygon(path: CoordPath, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        throw new Error("Method not implemented.");
    }
    addFeature(feature: google.maps.Data.FeatureOptions | IGoogleMapsFeature): IGoogleMapsFeature
    {
        throw new Error("Method not implemented.");
    }
    findFeature(id: string | number): google.maps.Data.Feature
    {
        throw new Error("Method not implemented.");
    }
    removeFeature(featureOrId: string | number | IGoogleMapsFeature | google.maps.Data.Feature): IGoogleMapsFeature
    {
        throw new Error("Method not implemented.");
    }
    loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>
    {
        throw new Error("Method not implemented.");
    }
    toGeoJson(): Promise<any>
    {
        throw new Error("Method not implemented.");
    }
    
}