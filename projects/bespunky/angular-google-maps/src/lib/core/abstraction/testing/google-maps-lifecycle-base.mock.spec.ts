import { Component } from '@angular/core';
import { WrapperFactory } from '../tokens/wrapper-factory.token';
import { GoogleMapsLifecycleBase } from '../base/google-maps-lifecycle-base';
import { IGoogleMapsNativeObjectEmittingWrapper } from "../base/i-google-maps-native-object-emitting-wrapper";

function createNativeWrapper(): IGoogleMapsNativeObjectEmittingWrapper
{
    return {
        listenTo       : () => Promise.resolve(() => void 0),
        stopListeningTo: () => Promise.resolve(),
        clearListeners : () => Promise.resolve(),
        native         : Promise.resolve({}),
        custom         : null
    };
}

@Component({
    providers: [ { provide: WrapperFactory, useFactory: () => createNativeWrapper } ]
})
export class MockLifecycleComponent extends GoogleMapsLifecycleBase<IGoogleMapsNativeObjectEmittingWrapper>
{

}
