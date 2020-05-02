import { fakeAsync, tick } from '@angular/core/testing';

import { GoogleMapsFeatureDirective } from './google-maps-feature.directive';
import { GoogleMapsInternalApiService } from '../../../../core/api/google-maps-internal-api.service';
import { configureGoogleMapsTestingModule } from '../../../../testing/setup.spec';
import { MockGoogleMapsFeature } from '../../../../testing/mocks/modules/mock-google-maps-feature.spec';
import { MockGoogleMapsData } from '../../../../testing/mocks/modules/mock-google-maps-data.spec';
import { MockGoogleMap } from '../../../../google-map/testing/mock-google-map.spec';

describe('GoogleMapsFeatureDirective', () =>
{
    let directive: GoogleMapsFeatureDirective;
    let api      : GoogleMapsInternalApiService;

    beforeEach(async () =>
    {
        ({ internalApi: api } = await configureGoogleMapsTestingModule());

       directive = new GoogleMapsFeatureDirective(api, () => new MockGoogleMapsFeature(new MockGoogleMapsData(new MockGoogleMap())));
    });

    it('should create an instance', () => expect(directive).toBeTruthy());

    it('should hook to events from the data layer raised for the native feature', fakeAsync(() =>
    {
        const feature = directive.wrapper;
        const data    = feature.data as MockGoogleMapsData;
        
        const handler = jasmine.createSpyObj('eventHandler', ['handle']);

        directive.click.subscribe(handler.handle);

        data.events.raise('click', { feature: feature.native });                 tick();
        data.events.raise('click', { feature: new google.maps.Data.Feature() }); tick();
        data.events.raise('click', { feature: feature.native });                 tick();

        expect(handler.handle).toHaveBeenCalledTimes(2);
    }));

    it('should add the feature to the containing data layer', () =>
    {
        spyOn(directive.wrapper.data, 'addFeature').and.stub();

        directive.ngOnInit();

        expect(directive.wrapper.data.addFeature).toHaveBeenCalledTimes(1);
    });

    it('should remove itself from the containing data layer on destruction', () =>
    {
        spyOn(directive.wrapper.data, 'removeFeature').and.stub();

        directive.ngOnDestroy();

        expect(directive.wrapper.data.removeFeature).toHaveBeenCalledTimes(1);
    });
});
