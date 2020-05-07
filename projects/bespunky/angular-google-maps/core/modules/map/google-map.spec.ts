import { ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule, expectPositionEquals                      } from '@bespunky/angular-google-maps/testing';
import { MockSuperpower1                                                             } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService, Defaults, GoogleMap, ISuperpowers, SuperpowersService } from '@bespunky/angular-google-maps/core';

const elementStub: any = document.createElement('div');

describe('GoogleMap', () =>
{
    let map        : GoogleMap;
    let api        : GoogleMapsApiService;
    let mapElement : ElementRef;
    let superpowers: ISuperpowers

    beforeEach(async () =>
    {
        ({ api } = await configureGoogleMapsTestingModule());

        superpowers = new SuperpowersService([new MockSuperpower1()]);
        mapElement  = new ElementRef(elementStub);
        map         = new GoogleMap(superpowers, api, mapElement);
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(map).toBeTruthy());

        it('should instantiate a new native map with the default zoom and center', () =>
        {
            expectPositionEquals(map.getCenter(), Defaults.Center);
            expect(map.getZoom()).toBe(Defaults.ZoomLevel);
        });

        it('should allow instantiating the native map with custom options', () =>
        {
            const customMap = new GoogleMap(superpowers, api, mapElement, {
                center: new google.maps.LatLng({ lat: 2, lng: 2 }),
                zoom: 999
            });

            expect(customMap).toBeDefined();
            expectPositionEquals(customMap.getCenter(), { lat: 2, lng: 2 });
            expect(customMap.getZoom()).toBe(999);
        });

        it('should attach all superpowers to itself', () => expect(map.superpowers.use(MockSuperpower1).map).toBe(map));
    });
});