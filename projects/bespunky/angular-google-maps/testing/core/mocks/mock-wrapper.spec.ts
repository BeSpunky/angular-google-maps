import { NativeObjectWrapper            } from '../../../decorators/native-object-wrapper.decorator';
import { Wrap                           } from '../../../decorators/wrap.decorator';
import { OutsideAngular                 } from '../../../decorators/outside-angular.decorator';
import { IGoogleMapsNativeObjectWrapper } from '../../base/i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObject        } from '../../native/i-google-maps-native-object';
import { MockNative                     } from './mock-native.spec';

@NativeObjectWrapper
export class MockWrapper<TNative extends IGoogleMapsNativeObject = MockNative> implements IGoogleMapsNativeObjectWrapper<TNative>
{
    public api = jasmine.createSpyObj('MockWrapperApiService', ['runOutsideAngular']);

    custom: any;

    constructor(public native: TNative)
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