import { InjectionToken, ValueProvider } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const GoogleMapsApiReadyPromise = new InjectionToken<BehaviorSubject<Promise<void>>>('GoogleMapsApiReadyPromiseToken');

export const GoogleMapsApiReadyPromiseProvider: ValueProvider = {
    provide: GoogleMapsApiReadyPromise,
    useValue: new BehaviorSubject(null)
};
