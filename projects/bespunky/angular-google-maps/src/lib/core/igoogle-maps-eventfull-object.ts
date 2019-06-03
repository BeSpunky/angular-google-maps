export interface IGoogleMapsEventfullObject
{
    listenTo(eventName: string, handler: () => void);
    stopListeningTo(eventName: string);
}
