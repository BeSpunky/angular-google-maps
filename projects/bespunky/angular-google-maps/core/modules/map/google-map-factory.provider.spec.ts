import { MockNative, produceWrapperFactoryProviderSpecs, setupWrapperFactoryProviderTest } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMap, GoogleMapFactoryProvider, SuperpowersService                         } from '@bespunky/angular-google-maps/core';

const mockNative = new MockNative();

describe('GoogleMapFactoryProvider', () =>
{
    let producedNative   : any;

    async function setup(platform: any)
    {
        const config = { platform, native: mockNative, providers: [SuperpowersService] };
        
        ({ producedValue: producedNative } = await setupWrapperFactoryProviderTest(GoogleMapFactoryProvider, config));
    }

    produceWrapperFactoryProviderSpecs(setup, () => GoogleMapFactoryProvider, () => producedNative, GoogleMap, mockNative);
});
