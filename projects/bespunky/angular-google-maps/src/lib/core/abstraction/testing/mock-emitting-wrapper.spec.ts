import { MockWrapper } from './mock-wrapper.spec';
import { MockNative } from './mock-native.spec';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../base/i-google-maps-native-object-emitting-wrapper';

export class MockEmittingWrapper extends MockWrapper implements IGoogleMapsNativeObjectEmittingWrapper<MockNative>
{
    constructor(public native: MockNative)
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