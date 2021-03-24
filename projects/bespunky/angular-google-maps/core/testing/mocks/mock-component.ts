import { Component, Input, Output, EventEmitter, FactoryProvider } from '@angular/core';

import { GoogleMapsComponentBase, WrapperInstance, Hook, IGoogleMapsEventData, NativeObjectWrapper } from '@bespunky/angular-google-maps/core';
import { WrappedNativeFunctions                                                                    } from '@bespunky/angular-google-maps/core';
import { MockNative                                                                                } from './mock-native';
import { MockEmittingWrapper                                                                       } from './mock-emitting-wrapper';

@NativeObjectWrapper<TestWrapper>()
class     TestWrapper extends MockEmittingWrapper<MockNative> { }

interface TestWrapper extends WrappedNativeFunctions<MockNative> { }

export  function TestWrapperFactory()
{
    return new TestWrapper(new MockNative());
}

export const TestWrapperFactoryProvider: FactoryProvider = {
    provide   : WrapperInstance,
    useFactory: TestWrapperFactory
};

// @dynamic
@Component({
    selector: 'test-lifecycle',
    template: '<div></div>',
    providers: [TestWrapperFactoryProvider] // TODO: Move to module
})
export class MockComponent extends GoogleMapsComponentBase<TestWrapper>
{
    public readonly NativeClickEventName  = 'click';
    public readonly NativeChangeEventName = 'dummy_change';

    @Input() something: any;

    @Hook()               @Output() click      : EventEmitter<IGoogleMapsEventData>;
    @Hook('dummy_change') @Output() dummyChange: EventEmitter<IGoogleMapsEventData>;
}