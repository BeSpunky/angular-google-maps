import { BehaviorSubject } from 'rxjs';
import { ValueProvider, FactoryProvider, Type } from "@angular/core";
import { TestBed } from '@angular/core/testing';

import { configureGoogleMapsTestingModule } from '../../testing/setup.spec';
import { WrapperFactory } from '../../core/abstraction/tokens/wrapper-factory.token';
import { IGoogleMap } from '../../google-map/i-google-map';
import { IGoogleMapsMarker } from '../marker/i-google-maps-marker';
import { IGoogleMapsDrawableOverlay } from '../../core/abstraction/base/i-google-maps-drawable-overlay';
import { IGoogleMapsData } from '../data/i-google-maps-data';
import { GoogleMapComponent } from '../../google-map/component/google-map.component';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';

function setupOverlayWrapperFactoryProviderTest(factoryProvider: FactoryProvider)
{
    const mapElement = document.createElement('div');
    
    configureGoogleMapsTestingModule({
        customize: (def) =>
        {
            def.providers.push(factoryProvider);
            def.providers.push({
                provide: GoogleMapComponent,
                useFactory: (api) => new GoogleMapComponent(api, () => new MockMap(mapElement)),
                deps: [GoogleMapsApiService]
            });
        }
    });

    return TestBed.inject(WrapperFactory);
}

export function itShouldCreateOverlayWrapper(factoryProvider: FactoryProvider, wrapperType: Type<IGoogleMapsDrawableOverlay>)
{
    it(`should allow the creation of a new ${wrapperType.name} object when injected`, () =>
    {
        const createData = setupOverlayWrapperFactoryProviderTest(factoryProvider);

        expect(createData instanceof Function).toBeTruthy();
        expect(createData() instanceof wrapperType).toBeTruthy();
    });
}

class MockMap implements IGoogleMap
{
    private nativeMap: google.maps.Map;

    constructor(public mapElement: HTMLElement) 
    {
        this.nativeMap = new google.maps.Map(mapElement);
    }
    createDataLayer(options?: google.maps.Data.DataOptions): Promise<IGoogleMapsData>
    {
        throw new Error("Method not implemented.");
    }
    removeOverlay(overlay: IGoogleMapsDrawableOverlay): Promise<void>
    {
        throw new Error("Method not implemented.");
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