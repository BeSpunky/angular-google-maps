import { Injectable, Inject, Type } from '@angular/core';

import { IMapSuperpowers } from './i-map-superpowers';
import { IMapSuperpower  } from './i-map-superpower';
import { Superpowers     } from './superpowers.token';

// Will be provided in the map component's injector to allow a clean state for each initialized map component.
// Avoided using `providedIn: GoogleMapComponent` to prevent circular dependency.
@Injectable()
export class SuperpowersService implements IMapSuperpowers
{
    private powersByName: { [type: string]: IMapSuperpower };

    constructor(@Inject(Superpowers) private superpowers: IMapSuperpower[])
    {
        this.mapPowers();
    }

    private mapPowers()
    {
        this.powersByName = this.superpowers.reduce((powers, power) => (powers[power.type.toString()] = power) && powers, {});
    }

    public use<T extends IMapSuperpower>(type: Type<T>): T
    {
        return this.powersByName[type.toString()] as T;
    }
}
