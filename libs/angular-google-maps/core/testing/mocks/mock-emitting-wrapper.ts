import { IGoogleMapsNativeObject, IGoogleMapsNativeObjectEmittingWrapper, NativeObjectWrapper } from '@bespunky/angular-google-maps/core';
import { MockWrapper      } from './mock-wrapper';
import { MockGoogleEvents } from './mock-events-manager';

// @dynamic
@NativeObjectWrapper()
export class MockEmittingWrapper<TNative extends IGoogleMapsNativeObject>
     extends MockWrapper<TNative>
  implements IGoogleMapsNativeObjectEmittingWrapper<TNative>
{
    public events = new MockGoogleEvents();

    constructor(native: TNative)
    {
        super(native);
    }

    listenTo(eventName: string, handler: (...args: any[]) => void): () => void
    {
        return this.events.listenTo(eventName, handler);
    }

    stopListeningTo(eventName: string): void
    {
        this.events.stopListeningTo(eventName);
    }

    clearListeners(): void
    {
        this.events.clearListeners();
    }
}