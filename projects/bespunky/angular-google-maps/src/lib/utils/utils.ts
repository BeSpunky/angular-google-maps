import { FactoryProvider } from '@angular/core';
import { GoogleMapsEventsMap } from '../core/abstraction/types/google-maps-events-map.type';
import { BehaviorSubject } from 'rxjs';
import { IGoogleMap } from '../google-map/i-google-map';
import { EventsMap } from '../core/abstraction/events/event-map.token';

export function convertEnumToGoogleMapsEventsMap(eventEnum: any): GoogleMapsEventsMap
{
    return Object.keys(eventEnum).map(eventName => ({ name: eventName, reference: eventEnum[eventName] }));
}

export function createEventMapProvider(eventEnum: any): FactoryProvider
{
    return {
        provide: EventsMap,
        useFactory: convertEnumToGoogleMapsEventsMap,
        deps: [eventEnum]
    };
}

export function ensureMapInstantiated(currentMap: BehaviorSubject<IGoogleMap>)
{
    if (!currentMap?.value)
        throw new Error('No map instantiated. Is the current object being instantiated within the right context?');
}