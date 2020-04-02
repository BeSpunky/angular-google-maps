import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';

export class MockNative implements IGoogleMapsNativeObject
{
    public property: any;
    public listeners = {};

    public googleEventsListenTo(eventName: string, handler: (...args: any[]) => void): () => void
    {
        if (!this.listeners[eventName])
            this.listeners[eventName] = [];
        
        const handlers = this.listeners[eventName];
        
        handlers.push(handler);

        return () => handlers.splice(handlers.findIndex(handler), 1);
    }

    public googleEventsStopListeningTo(eventName: string): void
    {
        this.listeners[eventName] = [];
    }

    public googleEventsClearListeners(): void
    {
        this.listeners = {};
    }

    public googleEventsRaise(eventName: string, ...args: any[])
    {
        const handlers = this.listeners[eventName] || [];

        handlers.forEach(handle => handle(...args));
    }
    
    public getProperty(): any
    {
        return this.property;
    }

    public setProperty(value: any): void
    {
        this.property = value;
    }
}