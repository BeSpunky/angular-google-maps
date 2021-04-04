import { TestBed    } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule, expectPositionEquals                                                                                  } from '@bespunky/angular-google-maps/testing';
import { MockSuperpower1, produceCoordSpecs, producePathSpecs, produceIBoundsSpecs, expectCoord, produceDataGeometrySpecs                        } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService, Defaults, GoogleMap, ISuperpowers, SuperpowersChargerService, SuperpowersService, SuperpowersProvider, BoundsLike } from '@bespunky/angular-google-maps/core';

const elementStub: any = document.createElement('div');

describe('GoogleMap', () =>
{
    let nativeMap        : google.maps.Map;
    let map              : GoogleMap;
    let api              : GoogleMapsApiService;
    // let mapElement       : ElementRef;
    let superpowers      : ISuperpowers
    let runOutsideAngular: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule({
            customize: def => def.providers = [SuperpowersProvider, SuperpowersService]
        }));

        TestBed.inject(SuperpowersChargerService).charge(MockSuperpower1);
        
        superpowers = TestBed.inject(SuperpowersService);
        // mapElement  = new ElementRef(elementStub);
        nativeMap   = new google.maps.Map(elementStub);
        map         = new GoogleMap(superpowers, api, nativeMap);
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(map).toBeTruthy());

        it('should attach all superpowers to itself', () => expect(map.superpowers.use(MockSuperpower1).map).toBe(map));
    });

    describe('calling `setCenter()`', () =>
    {
        produceCoordSpecs('set the center outside angular', (coord) =>
        {
            runOutsideAngular.calls.reset();

            map.setCenter(coord);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);

            expectCoord(() => map.getCenter(), coord);
        });
    });

    describe('calling `fitBounds()`', () =>
    {
        let nativeFitBounds: jasmine.Spy;
        
        beforeEach(() =>
        {
            runOutsideAngular.calls.reset();
            nativeFitBounds = spyOn(map.native, 'fitBounds').and.stub();
        });
        
        function expectFitBounds(boundsLike: BoundsLike, padding?: number | google.maps.Padding)
        {
            map.fitBounds([boundsLike], padding);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(nativeFitBounds).toHaveBeenCalledWith(api.geometry.defineBounds(boundsLike), padding);
        }

        produceCoordSpecs       ('set bounds with no padding outside angular', (coord) => expectFitBounds(coord));
        producePathSpecs        ('set bounds with no padding outside angular', (coord) => expectFitBounds(coord));
        produceDataGeometrySpecs('set bounds with no padding outside angular', (coord) => expectFitBounds(coord));
        produceIBoundsSpecs     ('set bounds with no padding outside angular', (coord) => expectFitBounds(coord));

        produceCoordSpecs       ('set bounds with padding outside angular', (coord) => expectFitBounds(coord, 10));
        producePathSpecs        ('set bounds with padding outside angular', (coord) => expectFitBounds(coord, 10));
        produceDataGeometrySpecs('set bounds with padding outside angular', (coord) => expectFitBounds(coord, 10));
        produceIBoundsSpecs     ('set bounds with padding outside angular', (coord) => expectFitBounds(coord, 10));
    });

    describe('calling `panToBounds()`', () =>
    {
        let nativePanToBounds: jasmine.Spy;
        
        beforeEach(() =>
        {
            runOutsideAngular.calls.reset();
            nativePanToBounds = spyOn(map.native, 'panToBounds').and.stub();
        });
        
        function expectPanToBounds(boundsLike: BoundsLike, padding?: number | google.maps.Padding)
        {
            map.panToBounds([boundsLike], padding);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(nativePanToBounds).toHaveBeenCalledWith(api.geometry.defineBounds(boundsLike), padding);
        }

        produceCoordSpecs       ('pan to bounds with no padding outside angular', (coord) => expectPanToBounds(coord));
        producePathSpecs        ('pan to bounds with no padding outside angular', (coord) => expectPanToBounds(coord));
        produceDataGeometrySpecs('pan to bounds with no padding outside angular', (coord) => expectPanToBounds(coord));
        produceIBoundsSpecs     ('pan to bounds with no padding outside angular', (coord) => expectPanToBounds(coord));

        produceCoordSpecs       ('pan to bounds with padding outside angular', (coord) => expectPanToBounds(coord, 10));
        producePathSpecs        ('pan to bounds with padding outside angular', (coord) => expectPanToBounds(coord, 10));
        produceDataGeometrySpecs('pan to bounds with padding outside angular', (coord) => expectPanToBounds(coord, 10));
        produceIBoundsSpecs     ('pan to bounds with padding outside angular', (coord) => expectPanToBounds(coord, 10));
    });

    describe('calling `panTo()`', () =>
    {
        let nativePanTo: jasmine.Spy;
        
        beforeEach(() =>
        {
            runOutsideAngular.calls.reset();
            nativePanTo = spyOn(map.native, 'panTo').and.stub();
        });

        produceCoordSpecs('pan to a coord outside angular', (coord) =>
        {
            map.panTo(coord);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(nativePanTo).toHaveBeenCalledWith(api.geometry.toLiteralCoord(coord));
        });
    });

    describe('calling `getMapType()`', () =>
    {
        it('should fetch the map type id', () =>
        {
            const nativeGetMapTypeId = spyOn(map.native, 'getMapTypeId').and.stub();
            
            map.getMapType();

            expect(nativeGetMapTypeId).toHaveBeenCalledTimes(1);
        });
    });

    describe('calling `setMapType()`', () =>
    {
        it('should set the map type id outside angular', () =>
        {
            const nativeSetMapTypeId = spyOn(map.native, 'setMapTypeId').and.stub();
            runOutsideAngular.calls.reset();

            map.setMapType(google.maps.MapTypeId.SATELLITE);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(nativeSetMapTypeId).toHaveBeenCalledTimes(1);
        });
    });

});