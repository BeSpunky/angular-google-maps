// import { Component } from '@angular/core';
// import { WrapperFactory } from '../tokens/wrapper-factory.token';
// import { GoogleMapsLifecycleBase } from '../base/google-maps-lifecycle-base';
// import { EmittingWrapper } from '../types/emitting-wrapper.type';

// function createNativeWrapper(): EmittingWrapper
// {
//     return {
//         listenTo       : () => () => void 0,
//         stopListeningTo: () => ,
//         clearListeners : () => Promise.resolve(),
//         native         : Promise.resolve({}),
//         custom         : null
//     };
// }


// @Component({
//     providers: [ { provide: WrapperFactory, useFactory: () => createNativeWrapper } ]
// })
// export class MockLifecycleComponent extends GoogleMapsLifecycleBase<EmittingWrapper>
// {

// }
