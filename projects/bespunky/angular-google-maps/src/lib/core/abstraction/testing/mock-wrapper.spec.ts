import { IGoogleMapsNativeObjectWrapper } from '../base/i-google-maps-native-object-wrapper';
import { NativeObjectWrapper } from '../../decorators/native-object-wrapper.decorator';
import { MockNative } from './mock-native.spec';
import { Wrap } from '../../decorators/wrap.decorator';
import { OutsideAngular } from '../../decorators/outside-angular.decorator';

@NativeObjectWrapper
export class MockWrapper implements IGoogleMapsNativeObjectWrapper<MockNative>
{
    public api = jasmine.createSpyObj('MockWrapperApiService', ['runOutsideAngular']);

    custom: any;

    constructor(public native: MockNative)
    {
        this.api.runOutsideAngular.and.callFake(fn => fn());
    }

    // Method body is not required but errors are thrown so they can be captured when testing
    // if @NativeObjectWrapper provided an implmentation.

    @Wrap()
    public getProperty(): any { throw new Error('Wrapper method not implemented'); }

    @Wrap() @OutsideAngular
    public setProperty(value: any): void { throw new Error('Wrapper method not implemented'); }

    @Wrap('findById')
    public find(id: any): any { throw new Error('Wrapper method not implemented'); }
}