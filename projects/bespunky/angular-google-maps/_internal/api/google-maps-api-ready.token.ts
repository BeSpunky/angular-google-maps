import { BehaviorSubject } from 'rxjs';
import { InjectionToken, ValueProvider } from '@angular/core';

export const GoogleMapsApiReadyPromise = new InjectionToken<BehaviorSubject<Promise<void>>>('GoogleMapsApiReadyPromiseToken');

export const DefaultApiReadyPromiseProvider = new BehaviorSubject(null);

export const GoogleMapsApiReadyPromiseProvider: ValueProvider = {
    provide : GoogleMapsApiReadyPromise,
    useValue: DefaultApiReadyPromiseProvider
};
