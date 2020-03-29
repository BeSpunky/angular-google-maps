import { InjectionToken } from '@angular/core';
import { GoogleMapsEventsMap } from '../types/google-maps-events-map.type';

/**
 * An injection token used by `GoogleMapsLifecycleBase` and its extending classes to specify the factory that will be used to
 * create the map of events supported by components.
 * The `GoogleMapsLifecycleBase` class uses this token to determine what native events to hook to which angular `EventEmitter`.
 * 
 * Components and directives extending `GoogleMapsLifecycleBase` should define a `FactoryProvider` for this token.
*/
export const EventsMap = new InjectionToken<GoogleMapsEventsMap>('GoogleMaps.EventMap');
