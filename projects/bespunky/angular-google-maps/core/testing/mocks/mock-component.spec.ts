import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GoogleMapsLifecycleBase, WrapperFactory, Hook, GoogleMapsEventData } from '@bespunky/angular-google-maps/core';
import { MockNative          } from './mock-native.spec';
import { MockEmittingWrapper } from './mock-emitting-wrapper.spec';

export function WrapperFactoryProvider()
{
    return () => new MockEmittingWrapper(new MockNative());
}

@Component({
    selector: 'test-lifecycle',
    template: '<div></div>',
    providers: [{ provide: WrapperFactory, useFactory: WrapperFactoryProvider }] // TODO: Move to module
})
export class MockComponentWithLifecycle extends GoogleMapsLifecycleBase<MockEmittingWrapper<MockNative>>
{
    public readonly NativeClickEventName  = 'click';
    public readonly NativeChangeEventName = 'dummy_change';

    @Input() property: any;

    @Hook()               @Output() click      : EventEmitter<GoogleMapsEventData>;
    @Hook('dummy_change') @Output() dummyChange: EventEmitter<GoogleMapsEventData>;
}