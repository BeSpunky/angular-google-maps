import { MockWrapper } from './mock-wrapper.spec';
import { MockNative } from './mock-native.spec';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../base/i-google-maps-native-object-emitting-wrapper';
import { NativeObjectWrapper } from '../../decorators/native-object-wrapper.decorator';
import { Wrap } from '../../decorators/wrap.decorator';
import { OutsideAngular } from '../../decorators/outside-angular.decorator';

@NativeObjectWrapper
export class MockEmittingWrapper<TNative extends MockNative>
     extends MockWrapper
  implements IGoogleMapsNativeObjectEmittingWrapper<TNative>
{
    constructor(public native: TNative)
    {
        super(native);
    }

    listenTo(eventName: string, handler: (...args: any[]) => void): () => void
    {
        return this.native.googleEventsListenTo(eventName, handler);
    }

    stopListeningTo(eventName: string): void
    {
        this.native.googleEventsStopListeningTo(eventName);
    }

    clearListeners(): void
    {
        this.native.googleEventsClearListeners();
    }

    @Wrap()
    public getProperty(): any { return void 0; }

    @Wrap()
    public setProperty(value: any): void { };
}