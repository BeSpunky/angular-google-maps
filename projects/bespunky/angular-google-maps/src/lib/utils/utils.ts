import { GoogleMapsEventsMap } from '../core/types/google-maps-events-map.type';

export function convertEnumToGoogleMapsEventsMap(eventEnum: any): GoogleMapsEventsMap
{
    return Object.keys(eventEnum).map(eventName => ({ name: eventName, reference: eventEnum[eventName] }));
}