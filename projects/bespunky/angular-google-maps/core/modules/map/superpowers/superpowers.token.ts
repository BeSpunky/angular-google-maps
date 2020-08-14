import { ReplaySubject } from 'rxjs';
import { InjectionToken, Type, ValueProvider } from '@angular/core';

import { ISuperpower } from './i-superpower';

/** The type of observable used for storing and sharing superpower types in the system. */
export type ChargedSuperpowers = ReplaySubject<Type<ISuperpower>>;

/**
 * An injectable token to set and retrieve the subject for superpowers charged in the system.
 * 
 * Superpower services should inherit `ISuperpower` and be decorated with `@Injectable({ providedIn: GoogleMapModule })`.
 */
export const Superpowers = new InjectionToken<ChargedSuperpowers>('GoogleMaps.Superpowers');

/** The default subject used to notify of loaded superpowers. */
export const DefaultSuperpowersProvider = new ReplaySubject();

/**
 * Injected at root level and only holds the types of superpowers already loaded.
 * `SuperpowersChargerService` will feed the token with types of superpowers.
 * `SuperpowersService` will be instantiated for each map and consume the token to allow lazy loading of powers.
 */
export const SuperpowersProvider: ValueProvider = { provide: Superpowers, useValue: DefaultSuperpowersProvider };