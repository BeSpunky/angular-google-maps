import { MockWrapper } from './mock-wrapper.spec';
import { MockNative } from './mock-native.spec';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../base/i-google-maps-native-object-emitting-wrapper';

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
}