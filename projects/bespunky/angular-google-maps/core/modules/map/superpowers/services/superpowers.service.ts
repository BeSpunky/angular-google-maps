import { Injectable, Inject, Type } from '@angular/core';

import { Superpowers    } from '../superpowers.token';
import { IMapSuperpower } from '../i-map-superpower';

// Will be provided in the map component's injector to allow a clean state for each initialized map component.
// Avoided using `providedIn: GoogleMapComponent` to prevent circular dependency.
@Injectable()
export class SuperpowersService
{
    private map: { [type: string]: IMapSuperpower };

    constructor(@Inject(Superpowers) private superpowers: IMapSuperpower[])
    {
        this.mapSuperpowers();
    }

    private mapSuperpowers()
    {
        this.map = this.superpowers.reduce((powers, power) => (powers[power.type.toString()] = power) && powers, {});
    }

    public use<T extends IMapSuperpower>(type: Type<T>): T
    {
        return this.map[type.toString()] as T;
    }
}
