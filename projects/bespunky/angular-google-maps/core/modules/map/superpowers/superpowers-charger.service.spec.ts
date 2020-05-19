import { take    } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';

import { configureGoogleMapsTestingModule                                                } from '@bespunky/angular-google-maps/testing';
import { MockSuperpower1                                                                 } from '@bespunky/angular-google-maps/core/testing';
import { SuperpowersProvider, SuperpowersChargerService, ChargedSuperpowers, Superpowers } from '@bespunky/angular-google-maps/core';

describe('SuperpowersChargerService', () =>
{
    let charger      : SuperpowersChargerService;
    let chargedPowers: ChargedSuperpowers;

    beforeEach(() =>
    {
        configureGoogleMapsTestingModule({ customize: def => def.providers = [SuperpowersProvider]});

        charger       = TestBed.inject(SuperpowersChargerService);
        chargedPowers = TestBed.inject(Superpowers);
    });

    it('should be created', () => expect(charger).toBeTruthy());

    it('should charge a new power to the powers list', () =>
    {
        chargedPowers.pipe(take(1)).subscribe(power => expect(power).toBe(MockSuperpower1))

        charger.charge(MockSuperpower1);
    });
});
