import { BehaviorSubject } from 'rxjs';
import { InjectionToken, FactoryProvider } from '@angular/core';

import { IGoogleMap } from '../i-google-map';

export const CurrentMap = new InjectionToken<BehaviorSubject<IGoogleMap>>('GoogleMaps.CurrentMap');

export const CurrentMapProvider: FactoryProvider = {
    provide: CurrentMap,
    useFactory: () => new BehaviorSubject<IGoogleMap>(null)
}
