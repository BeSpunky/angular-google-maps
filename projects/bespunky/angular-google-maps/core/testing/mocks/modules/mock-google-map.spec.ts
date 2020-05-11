import { IGoogleMap, ISuperpowers, NativeObjectWrapper, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { MockEmittingWrapper                           } from '../mock-emitting-wrapper.spec';

export interface MockGoogleMap extends WrappedNativeFunctions<google.maps.Map> { }

@NativeObjectWrapper<MockGoogleMap>({ nativeType: google.maps.Map })
export class MockGoogleMap extends MockEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    constructor(public native: any = new google.maps.Map(document.createElement('div')), public readonly superpowers: ISuperpowers = null)
    {
        super(native);
    }
}