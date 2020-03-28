import { BehaviorSubject } from 'rxjs';
import { ValueProvider, FactoryProvider, Type } from "@angular/core";
import { TestBed } from '@angular/core/testing';

import { CurrentMap } from '../../core/abstraction/tokens/current-map.token';
import { configureGoogleMapsTestingModule } from '../../testing/setup';
import { WrapperFactory } from '../../core/abstraction/tokens/wrapper-factory.token';
import { IGoogleMap } from '../../google-map/i-google-map';
import { IGoogleMapsMarker } from '../marker/i-google-maps-marker';
import { IGoogleMapsDrawableOverlay } from '../../core/abstraction/base/i-google-maps-drawable-overlay';

function setupOverlayWrapperFactoryProviderTest(factoryProvider: FactoryProvider, mapCreated: boolean)
{
    const currentMap = new BehaviorSubject(null);
    const currentMapProvider: ValueProvider = {
        provide: CurrentMap,
        useValue: currentMap
    };

    if (mapCreated) currentMap.next(new MockMap(document.createElement('div')));

    configureGoogleMapsTestingModule({
        customize: (def) => {
            def.providers.push(currentMapProvider);
            def.providers.push(factoryProvider);
        }
    });

    return TestBed.inject(WrapperFactory);
}

export function itShouldCreateOverlayWrapper(factoryProvider: FactoryProvider, wrapperType: Type<IGoogleMapsDrawableOverlay>)
{
    it(`should allow the creation of a new ${wrapperType.name} object when injected`, () =>
    {
        const createData = setupOverlayWrapperFactoryProviderTest(factoryProvider, true);

        expect(createData instanceof Function).toBeTruthy();
        expect(createData() instanceof wrapperType).toBeTruthy();
    });
}

export function itShouldThrowIfMapNotCreatedBeforeOverlay(factoryProvider: FactoryProvider)
{
    it('should throw an error if the component doesn\'t define a div.google-map element', () =>
    {
        const createData = setupOverlayWrapperFactoryProviderTest(factoryProvider, false);

        expect(() => createData()).toThrow();
    });
}

class MockMap implements IGoogleMap
{
    private nativeMap: google.maps.Map;

    constructor(public mapElement: HTMLElement) 
    {
        this.nativeMap = new google.maps.Map(mapElement);
    }

    createMarker(position: google.maps.LatLng | google.maps.LatLngLiteral, options?: google.maps.ReadonlyMarkerOptions): Promise<IGoogleMapsMarker>
    {
        throw new Error("Method not implemented.");
    }
    getCenter(): Promise<google.maps.LatLng>
    {
        throw new Error("Method not implemented.");
    }
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    getZoom(): Promise<number>
    {
        throw new Error("Method not implemented.");
    }
    setZoom(zoomLevel: number): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    listenTo(eventName: string, handler: () => void): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    stopListeningTo(eventName: string): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    native = Promise.resolve(this.nativeMap);
    custom: any;
}