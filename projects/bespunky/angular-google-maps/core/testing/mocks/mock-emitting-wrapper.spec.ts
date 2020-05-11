import { IGoogleMapsNativeObject, IGoogleMapsNativeObjectEmittingWrapper, NativeObjectWrapper } from '@bespunky/angular-google-maps/core';
import { MockWrapper      } from './mock-wrapper.spec';
import { MockGoogleEvents } from './mock-events-manager.spec';

export class MockEmittingWrapper<TNative extends IGoogleMapsNativeObject>
     extends MockWrapper<TNative>
  implements IGoogleMapsNativeObjectEmittingWrapper<TNative>
{
    public events = new MockGoogleEvents();

    constructor(public native: TNative)
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