import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GoogleMapsLifecycleBase, WrapperFactory, Hook, GoogleMapsEventData, NativeObjectWrapper } from '@bespunky/angular-google-maps/core';
import { WrappedNativeFunctions                                                                  } from '@bespunky/angular-google-maps/core';
import { MockNative                                                                              } from './mock-native.spec';
import { MockEmittingWrapper                                                                     } from './mock-emitting-wrapper.spec';

@NativeObjectWrapper({ nativeType: MockNative })
class     TestWrapper extends MockEmittingWrapper<MockNative> { }

interface TestWrapper extends WrappedNativeFunctions<MockNative> { }

export function WrapperFactoryProvider()
{
    return () => new TestWrapper(new MockNative());
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

    @Input() something: any;

    @Hook()               @Output() click      : EventEmitter<GoogleMapsEventData>;
    @Hook('dummy_change') @Output() dummyChange: EventEmitter<GoogleMapsEventData>;
}