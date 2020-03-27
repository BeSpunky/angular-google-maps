import { InjectionToken } from '@angular/core';
import { GoogleMapsEventsMap } from '../types/google-maps-events-map.type';

export const EventsMap = new InjectionToken<GoogleMapsEventsMap>('GoogleMaps.EventMap');
