import { IGoogleMapsNativeObject, IGoogleMapsNativeObjectWrapper, NativeObjectWrapper, createNativeProxy } from '@bespunky/angular-google-maps/core';
import { MockNative } from './mock-native';

/**
 * As the native type is unknown until the moment of usage, an extending interface will not compile here.
 * When using the mock wrapper:
 * 1. Create a dummy class that inherits MockWrapper with the corresponding native generic type.
 * 2. Create an extension interface to allow intellisense and compilation with the mock native functions.
 * 
 * Do not skip step 1 as TypeScript will complain that there's already an there's a conflict between your type and
 * the imported `MockWrapper`. Strange though... What's the difference between having the extension interface
 * and the class on the same file or on different files?? 🤨
 * 
 * @example
 * class     TheWrapper extends MockWrapper<NativeMockType> { }
 * interface TheWrapper extends WrappedNativeFunctions<NativeMockType> { }
 */
@NativeObjectWrapper()
export class MockWrapper<TNative extends IGoogleMapsNativeObject = MockNative>
  implements IGoogleMapsNativeObjectWrapper<TNative>
{
    public api = jasmine.createSpyObj('MockWrapperApiService', ['runOutsideAngular']);

    custom: any;

    constructor(public native: TNative)
    {
        this.api.runOutsideAngular.and.callFake(fn => fn());

        return createNativeProxy(this);
    }
}