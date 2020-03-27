import { BehaviorSubject } from 'rxjs';
import { FactoryProvider } from '@angular/core';

import { IGoogleMap } from '../i-google-map';
import { CurrentMap } from '../../core/abstraction/tokens/current-map.token';

/**
 * Provides a `BehaviorSubject` that will be used by the `GoogleMapComponent` to notify child components of the creation of the 
 * map wrapper object.
 */
export const CurrentMapProvider: FactoryProvider = {
    provide: CurrentMap,
    useFactory: () => new BehaviorSubject<IGoogleMap>(null)
}
