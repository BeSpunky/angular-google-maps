export class MockGoogleEvents
{
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

    public raise(eventName: string, ...args: any[])
    {
        const handlers = this.listeners[eventName] || [];

        handlers.forEach(handle => handle(...args));
    }
}