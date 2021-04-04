import { IGoogleMap, ISuperpowers, NativeObjectWrapper, WrappedNativeFunctions, Coord, BoundsLike } from '@bespunky/angular-google-maps/core';
import { MockEmittingWrapper } from '../mock-emitting-wrapper';

export interface MockGoogleMap extends WrappedNativeFunctions<google.maps.Map, 'fitBounds' | 'panToBounds'> { }

@NativeObjectWrapper<MockGoogleMap>()
export class MockGoogleMap extends MockEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    constructor(public native: any = new google.maps.Map(document.createElement('div')), public readonly superpowers: ISuperpowers = null)
    {
        super(native);
    }

    setCenter(center: Coord): void
    {
        throw new Error("Method not implemented.");
    }
    fitBounds(elements: BoundsLike[], padding?: number | google.maps.Padding): void
    {
        throw new Error("Method not implemented.");
    }
    panToBounds(elements: BoundsLike[], padding?: number | google.maps.Padding): void
    {
        throw new Error("Method not implemented.");
    }
    panTo(position: Coord): void
    {
        throw new Error("Method not implemented.");
    }
    getMapType(): string
    {
        throw new Error("Method not implemented.");
    }
    setMapType(type: string): void
    {
        throw new Error("Method not implemented.");
    }
}