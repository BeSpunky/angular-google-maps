import { Injectable, Inject, Type } from '@angular/core';

import { IGoogleMap      } from '../i-google-map';
import { Superpowers     } from './superpowers.token';
import { ISuperpowers } from './i-superpowers';
import { ISuperpower  } from './i-superpower';

// Provided in the map component's injector to allow a clean state for each initialized map component.
@Injectable()
export class SuperpowersService implements ISuperpowers
{
    private powersByName: { [type: string]: ISuperpower };

    constructor(@Inject(Superpowers) private superpowers: ISuperpower[])
    {
        this.createPowerDictionary();
    }

    private createPowerDictionary()
    {
        this.powersByName = this.superpowers.reduce((powers, power) => (powers[power.type.toString()] = power) && powers, {});
    }

    public attachToMap(map: IGoogleMap)
    {
        this.superpowers.forEach(power => power.attach(map));
    }

    public use<T extends ISuperpower>(type: Type<T>): T
    {
        return this.powersByName[type.toString()] as T;
    }
}