import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Hook                    } from "../../../decorators/hook.decorator";
import { GoogleMapsLifecycleBase } from "../../base/google-maps-lifecycle-base";
import { WrapperFactory          } from "../../tokens/wrapper-factory.token";
import { GoogleMapsEventData     } from '../../events/google-maps-event-data';
import { MockNative              } from "./mock-native.spec";
import { MockEmittingWrapper     } from "./mock-emitting-wrapper.spec";

export function WrapperFactoryProvider()
{
    return () => new MockEmittingWrapper(new MockNative());
}

@Component({
    selector: 'test-lifecycle',
    template: '<div></div>',
    providers: [{ provide: WrapperFactory, useFactory: WrapperFactoryProvider }]
})
export class MockComponentWithLifecycle extends GoogleMapsLifecycleBase<MockEmittingWrapper<MockNative>>
{
    public readonly NativeClickEventName  = 'click';
    public readonly NativeChangeEventName = 'dummy_change';

    @Input() property: any;

    @Hook()               @Output() click      : EventEmitter<GoogleMapsEventData>;
    @Hook('dummy_change') @Output() dummyChange: EventEmitter<GoogleMapsEventData>;
}