import { Injectable, Inject, Type } from '@angular/core';

import { Superpowers, ChargedSuperpowers } from './superpowers.token';
import { ISuperpower                     } from './i-superpower';


/**
 * Globally registers superpowers in the system. Communicates with `SuperpowersService` through the `Superpowers` token.
 * Any registered superpower will be fed to `SuperpowersService` instances throughout the system to have them load
 * a new instance of the superpower.
 */
@Injectable({
    providedIn: 'root'
})
export class SuperpowersChargerService
{
    constructor(@Inject(Superpowers) private chargedPowers: ChargedSuperpowers) { }
    
    /**
     * Globally registers a new superpower and notifies all `SuperpowerService` instances of the new power.
     *
     * @param {Type<ISuperpower>} superpowerType The type of power to register.
     */
    public charge(superpowerType: Type<ISuperpower>)
    {
        this.chargedPowers.next(superpowerType);
    }
}
