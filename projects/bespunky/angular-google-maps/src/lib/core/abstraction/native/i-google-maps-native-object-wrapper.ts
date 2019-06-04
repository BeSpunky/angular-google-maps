export interface IGoogleMapsNativeObjectWrapper
{
    readonly native: any;

    listenTo(eventName: string, handler: () => void): void;
    stopListeningTo(eventName: string): void;
}
