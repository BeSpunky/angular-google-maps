import { IGoogleMapsNativeObject } from '../../native/i-google-maps-native-object';

export class MockNative implements IGoogleMapsNativeObject
{
    public property: any;
    public listeners = {};

    public listenTo(eventName: string, handler: (...args: any[]) => void): () => void
    {
        if (!this.listeners[eventName])
            this.listeners[eventName] = [];
        
        const handlers = this.listeners[eventName];
        
        handlers.push(handler);

        return () => handlers.splice(handlers.findIndex(handler), 1);
    }

    public stopListeningTo(eventName: string): void
    {
        this.listeners[eventName] = [];
    }

    public clearListeners(): void
    {
        this.listeners = {};
    }

    public raiseEvent(eventName: string, ...args: any[])
    {
        const handlers = this.listeners[eventName] || [];

        handlers.forEach(handle => handlers(...args));
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