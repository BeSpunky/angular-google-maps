import { Component, Input, Output, EventEmitter } from "@angular/core";

import { MockNative } from "./mock-native.spec";
import { MockEmittingWrapper } from "./mock-emitting-wrapper.spec";
import { Hook } from "../../decorators/hook.decorator";
import { WrapperFactory } from "../tokens/wrapper-factory.token";
import { GoogleMapsLifecycleBase } from "../base/google-maps-lifecycle-base";
import { GoogleMapsEventData } from '../events/google-maps-event-data';

export function CreateWrapperFactoryProvider()
{
    return () => new MockEmittingWrapper(new MockNative());
}

@Component({
    providers: [{ provide: WrapperFactory, useFactory: CreateWrapperFactoryProvider }]
})
export class MockComponentWithLifecycle extends GoogleMapsLifecycleBase<MockEmittingWrapper<MockNative>>
{
    @Input() property: any;

    @Hook('native_click') @Output() click: EventEmitter<GoogleMapsEventData>;
}