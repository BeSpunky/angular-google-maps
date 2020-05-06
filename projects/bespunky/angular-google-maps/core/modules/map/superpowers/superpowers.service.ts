import { Injectable, Inject, Type, Optional } from '@angular/core';

import { IGoogleMap   } from '../i-google-map';
import { Superpowers  } from './superpowers.token';
import { ISuperpowers } from './i-superpowers';
import { ISuperpower  } from './i-superpower';

// Provided in the map component's injector to allow a clean state for each initialized map component.
@Injectable()
export class SuperpowersService implements ISuperpowers
{
    private powersByName: { [type: string]: ISuperpower };

    constructor(@Optional() @Inject(Superpowers) private superpowers?: ISuperpower[])
    {
        this.superpowers = superpowers || []; // Default param value won't work as angular passes `null` instead of `undefined`

        this.createPowerDictionary();
    }

    private createPowerDictionary()
    {
        this.powersByName = this.superpowers.reduce((powers, power: Object) => (powers[power.constructor.name] = power) && powers, {});
    }

    public attachToMap(map: IGoogleMap)
    {
        this.superpowers.forEach(power => power.attach(map));
    }

    public use<T extends ISuperpower>(type: Type<T>): T
    {
        return this.powersByName[type.name] as T;
    }
}
