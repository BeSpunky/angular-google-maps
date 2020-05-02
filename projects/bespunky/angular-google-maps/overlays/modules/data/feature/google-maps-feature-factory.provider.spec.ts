
import { GoogleMapsFeatureFactoryProvider } from './google-maps-feature-factory.provider';
import { GoogleMapsFeature } from './google-maps-feature';
import { itShouldCreateWrapper } from '../../testing/wrapper-factory-provider-test-setup.spec';
import { GoogleMapsDataDirective } from '../directive/google-maps-data.directive';
import { MockGoogleMapsData } from '../../../../testing/overlays/mocks/modules/mock-google-maps-data.spec';
import { MockGoogleMap } from '../../../google-map/testing/mock-google-map.spec';
import { GoogleMapsInternalApiService } from '../../../core/api/google-maps-internal-api.service';

describe('GoogleMapsFeatureFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsFeatureFactoryProvider, GoogleMapsFeature, {
        provide: GoogleMapsDataDirective,
        useFactory: (api, map) => new GoogleMapsDataDirective(api, () => new MockGoogleMapsData(map)),
        deps: [GoogleMapsInternalApiService, MockGoogleMap]
    });
});
