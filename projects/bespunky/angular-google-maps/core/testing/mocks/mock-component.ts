import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GoogleMapsComponentBase, WrapperFactory, Hook, GoogleMapsEventData, NativeObjectWrapper } from '@bespunky/angular-google-maps/core';
import { WrappedNativeFunctions                                                                  } from '@bespunky/angular-google-maps/core';
import { MockNative                                                                              } from './mock-native';
import { MockEmittingWrapper                                                                     } from './mock-emitting-wrapper';

@NativeObjectWrapper<MockNative, TestWrapper>()
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
export class MockComponent extends GoogleMapsComponentBase<TestWrapper>
{
    public readonly NativeClickEventName  = 'click';
    public readonly NativeChangeEventName = 'dummy_change';

    @Input() something: any;

    @Hook()               @Output() click      : EventEmitter<GoogleMapsEventData>;
    @Hook('dummy_change') @Output() dummyChange: EventEmitter<GoogleMapsEventData>;
}