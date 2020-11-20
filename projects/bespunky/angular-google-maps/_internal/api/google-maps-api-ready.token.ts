import { BehaviorSubject } from 'rxjs';
import { InjectionToken, ValueProvider } from '@angular/core';

/**
 * An injectable token used for providing the maps api ready promise globally in the app.
 * 
 * The promise is created and managed by the [`GoogleMapsInternalApiService`](/docs/injectables/GoogleMapsInternalApiService.html)
 * then fed to the token.
 * 
 * @internal
 */
export const GoogleMapsApiReadyPromise = new InjectionToken<BehaviorSubject<Promise<void>>>('GoogleMapsApiReadyPromiseToken');

/**
 * The subject that will be used to feed the system with the maps api ready promise, and to read it as well.
 * 
 * @internal
 */
export const DefaultApiReadyPromiseProvider = new BehaviorSubject(null);

/**
 * Provides the subject that will be used to feed the system with the maps api ready promise, and to read it as well, for the `GoogleMapsApiReadyPromise` token.
 *
 * @internal
 **/
export const GoogleMapsApiReadyPromiseProvider: ValueProvider = {
    provide : GoogleMapsApiReadyPromise,
    useValue: DefaultApiReadyPromiseProvider
};
