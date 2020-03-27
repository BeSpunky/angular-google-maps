import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { configureGoogleMapsTestingModule } from "../testing/setup";
import { GoogleMapFactoryProvider } from './google-map-factory.provider';
import { WrapperFactory } from '../core/abstraction/tokens/wrapper-factory.token';
import { GoogleMap } from './google-map';

function setup(withClass: boolean)
{
    // Simulate <bs-google-map><div class="google-map"></div></bs-google-map>
    const mapComponentElement = document.createElement('div');
    const mapElement = document.createElement('div');
    
    if (withClass) mapElement.className = 'google-map';

    mapComponentElement.append(mapElement);

    configureGoogleMapsTestingModule({
        customize: (def) =>
        {
            def.providers.push(GoogleMapFactoryProvider);
            def.providers.push({ provide: ElementRef, useValue: new ElementRef(mapComponentElement) });
        }
    });

    return TestBed.inject(WrapperFactory);
}

describe('GoogleMapFactoryProvider', () =>
{
    it('should allow the creation of a new GoogleMap object when injected', () =>
    {
        const createMap = setup(true);

        expect(createMap instanceof Function).toBeTruthy();
        expect(createMap() instanceof GoogleMap).toBeTruthy();
    });

    it('should throw an error if the component doesn\'t define a div.google-map element', () =>
    {
        const createMap = setup(false);

        expect(() => createMap()).toThrow();
    });
});