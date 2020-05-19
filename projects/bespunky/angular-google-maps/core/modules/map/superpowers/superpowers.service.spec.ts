import { TestBed          } from '@angular/core/testing';
import { Type, Injectable } from '@angular/core';

import { configureGoogleMapsTestingModule                                       } from '@bespunky/angular-google-maps/testing';
import { MockSuperpower1, MockSuperpower2, MockGoogleMap                        } from '@bespunky/angular-google-maps/core/testing';
import { SuperpowersService, SuperpowersChargerService, ISuperpower, Superpower } from '@bespunky/angular-google-maps/core';

describe('SuperpowersService', () =>
{
    let charger    : SuperpowersChargerService;
    let superpowers: SuperpowersService;

    beforeEach(async () =>
    {
        await configureGoogleMapsTestingModule({
            customize: def => def.providers = [SuperpowersService]
        });

        charger     = TestBed.inject(SuperpowersChargerService);
        superpowers = TestBed.inject(SuperpowersService);

        charger.charge(MockSuperpower1);
        charger.charge(MockSuperpower2);
    });

    it('should be created', () => expect(superpowers).toBeTruthy());

    it('should return the number of charged superpowers', () => expect(superpowers.count).toBe(2));

    it('should attach all superpowers to a map when calling `attachToMap()`', () =>
    {
        // Expect all powers to be detached
        expect(superpowers.use(MockSuperpower1).map).toBeUndefined();
        expect(superpowers.use(MockSuperpower2).map).toBeUndefined();
        
        const map = new MockGoogleMap();
        
        superpowers.attachToMap(map);
        
        // Expect all powers to be attached to the new map
        expect(superpowers.use(MockSuperpower1).map).toBe(map);
        expect(superpowers.use(MockSuperpower2).map).toBe(map);
    });

    it('should not load a power twice', () =>
    {
        expect(superpowers.count).toBe(2);

        charger.charge(MockSuperpower2);

        expect(superpowers.count).toBe(2);
    });
    
    it('should detect, load and attach new powers charged after init', () =>
    {
        const map = new MockGoogleMap();

        superpowers.attachToMap(map);

        charger.charge(MockSuperpower3);

        expect(() => superpowers.use(MockSuperpower3)).not.toThrow();
        expect(superpowers.use(MockSuperpower3)).toBeInstanceOf(MockSuperpower3);
        expect(superpowers.use(MockSuperpower3).map).toBe(map);
    });

    it('should retrieve a superpower when calling `use()`', () => expect(superpowers.use(MockSuperpower1) instanceof MockSuperpower1).toBeTruthy());

    it('should throw when calling `use()` with a non-registered superpower', () => expect(() => superpowers.use({} as Type<ISuperpower>)).toThrowError(/hasn't been registered/));
});

@Injectable({ providedIn: 'root' })
class MockSuperpower3 extends Superpower { }