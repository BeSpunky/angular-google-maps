import { TestBed } from '@angular/core/testing';
import { Type    } from '@angular/core';

import { configureGoogleMapsTestingModule                                       } from '@bespunky/angular-google-maps/testing';
import { MockSuperpower1, MockSuperpower2, MockGoogleMap                        } from '@bespunky/angular-google-maps/core/testing';
import { SuperpowersService, createSuperpowerProvider, Superpowers, ISuperpower } from '@bespunky/angular-google-maps/core';

describe('SuperpowersService', () =>
{
    let superpowers: SuperpowersService;

    beforeEach(async () =>
    {
        await configureGoogleMapsTestingModule({
            customize: def => def.providers = [
                // Add 2 superpowers for testing
                createSuperpowerProvider(MockSuperpower1),
                createSuperpowerProvider(MockSuperpower2),
                SuperpowersService
            ]
        });

        superpowers = TestBed.inject(SuperpowersService);
    });

    it('should be created', () => expect(superpowers).toBeTruthy());

    it('should initialize correctly without superpower providers', () =>
    {
        expect(new SuperpowersService(null)).toBeTruthy();
        expect(new SuperpowersService(undefined)).toBeTruthy();
    });

    it('should attach all superpowers to a map when calling `attachToMap()`', () =>
    {
        const powers = TestBed.inject(Superpowers);

        expect(powers.length).toBe(2);
        // Expect all powers to be detached
        expect(powers.every(power => !power.map)).toBeTruthy();

        const map = new MockGoogleMap();

        superpowers.attachToMap(map);

        // Expect all powers to be attached to the new map
        expect(powers.every(power => power.map === map)).toBeTruthy();
    });

    it('should retrieve a superpower when calling `use()`', () => expect(superpowers.use(MockSuperpower1) instanceof MockSuperpower1).toBeTruthy());

    it('should return `undefined` when calling `use()` with a non-registered superpower', () => expect(superpowers.use({} as Type<ISuperpower>)).toBeUndefined());
});