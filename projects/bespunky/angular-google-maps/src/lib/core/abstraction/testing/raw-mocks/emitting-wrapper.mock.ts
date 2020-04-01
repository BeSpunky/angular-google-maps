import { MockWrapper } from './wrapper.mock';
import { MockNative } from './native.mock';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../../base/i-google-maps-native-object-emitting-wrapper';

export class MockEmittingWrapper extends MockWrapper implements IGoogleMapsNativeObjectEmittingWrapper<MockNative>
{
    constructor(public native: MockNative)
    {
        super(native);
    }

    listenTo(eventName: string, handler: (...args: any[]) => void): () => void
    {
        return this.native.listenTo(eventName, handler);
    }

    stopListeningTo(eventName: string): void
    {
        this.native.stopListeningTo(eventName);
    }

    clearListeners(): void
    {
        this.native.clearListeners();
    }
}