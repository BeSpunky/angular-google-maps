// class MockWrapper implements EmittingWrapper
// {
//     public listeners = [];
    
//     native = {
//         raiseEvent: (args: any) => this.listeners.forEach(handler => handler.call(this.native, args)),
//         fakeProperty: null
//     };
    
//     custom: any;    

//     listenTo(eventName: string, handler: (...args: any[]) => void): () => void
//     {
//         this.listeners.push(handler);

//         return () => this.listeners.splice(this.listeners.findIndex(handler), 1);
//     }

//     stopListeningTo(eventName: string): void
//     {
//         this.listeners = [];
//     }

//     clearListeners(): void
//     {
//         this.listeners = [];
//     }

//     setFakeProperty(value: any)
//     {
//         this.native.fakeProperty = value;
//     }
// }