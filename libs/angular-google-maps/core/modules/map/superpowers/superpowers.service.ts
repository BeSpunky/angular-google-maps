import { Injectable, Inject, Type, Injector } from '@angular/core';
import { Destroyable                        } from '@bespunky/angular-zen/core';

import { IGoogleMap                      } from '../i-google-map';
import { Superpowers, ChargedSuperpowers } from './superpowers.token';
import { ISuperpowers                    } from './i-superpowers';
import { ISuperpower                     } from './i-superpower';

/**
 * Manages all superpowers for a single map instance. Provided in the map component's injector to allow a clean state for each initialized map component.
 * 
 * This service communicates with `SuperpowersChargerService` through the `Superpowers` token.
 * `SuperpowersChargerService` registeres power types globally, and `SuperpowersService` instantiates them for the map it
 * was created for.
 */
@Injectable()
export class SuperpowersService extends Destroyable implements ISuperpowers
{
    private map   : IGoogleMap;
    private powers: { [type: string]: ISuperpower } = { };

    /**
     * Creates an instance of SuperpowersService.
     * 
     * @param {ChargedSuperpowers} chargedPowers All the superpower types currently charged and known to the system.
     * @param {Injector} injector The instance of the injector service.
     */
    constructor(@Inject(Superpowers) chargedPowers: ChargedSuperpowers, private injector: Injector)
    {
        super();

        this.subscribe(chargedPowers, this.load.bind(this));
    }

    /**
     * Instantiates a single superpower. If a map was already registered, the superpower will be attached to it.
     * Superpowers already registered will be ignored.
     *
     * @private
     * @param {Type<ISuperpower>} superpowerType The type of superpower to load.
     */
    private load(superpowerType: Type<ISuperpower>): void
    {
        const name = superpowerType.name;

        // Do not instantiate duplicate superpowers
        if (this.powers[name]) return;
        
        const power = this.injector.get(superpowerType);
        
        if (this.map)
            power.attach(this.map);

        this.powers[name] = power;
    }

    /**
     * Attaches all superpowers to the given map.
     * Any lazy loaded superpowers registered after the call to `attachToMap()` will automatically attach to it as well.
     *
     * @param {IGoogleMap} map The map to attach the superpowers to.
     */
    public attachToMap(map: IGoogleMap): void
    {
        this.map = map;

        Object.keys(this.powers).forEach(name => this.powers[name].attach(map));
    }
    
    /**
     * Extracts a superpower by its type. The superpower must be previously registered using `SuperpowersChargerService.charge()`.
     * Attempting to use unregistered superpowers will fail with an error.
     *
     * @template T The type of superpower being extracted.
     * @param {Type<T>} type The type of superpower being extracted.
     * @returns {T} The extracted superpower instance.
     */
    public use<T extends ISuperpower>(type: Type<T>): T
    {
        const power = this.powers[type.name] as T;

        if (!power)
            throw new Error(`
                Attempted to use superpower ${type.name}, which hasn't been registered yet.\n
                If ${type.name} is a custom superpower, make sure you call '<SuperpowersChargerService>.charge(${type.name})'.\n
                Otherwise, make sure you imported the relevant module (does ${type.name} belong to a lazy loaded module?).
            `);
        
        return power;
    }

    /**
     * Counts the number of powers instantiated.
     *
     * @readonly
     * @type {number}
     */
    public get count(): number
    {
        return Object.keys(this.powers).length;
    }
}
