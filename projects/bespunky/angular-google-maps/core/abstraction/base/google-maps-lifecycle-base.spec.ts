import { SimpleChange } from '@angular/core';

import { configureGoogleMapsTestingModule } from '../../testing/helpers/setup.spec';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { Observable } from 'rxjs';
import { MockComponentWithLifecycle } from '../testing/src/mock-component.spec';

describe('GoogleMapsLifecycleBase (abstract)', () =>
{
    let api          : GoogleMapsInternalApiService;
    let mockComponent: MockComponentWithLifecycle;

    beforeEach(async () =>
    {
        ({ internalApi: api, component: mockComponent } = await configureGoogleMapsTestingModule({ componentType: MockComponentWithLifecycle }));
    });

    it('should create an instance', () => expect(mockComponent).toBeTruthy());

    it('should instantiate the wrapper member', () => expect(mockComponent.wrapper).toBeDefined());

    it('should assign emitters to the component @Output members', () => expect(mockComponent.click instanceof Observable).toBeTruthy());

    it('delegate @Input changes to the native object', () =>
    {
        const native = mockComponent.wrapper.native;

        expect(native.property).toBeUndefined();

        mockComponent.property = 'dummy';

        // As changes are not made from a host template, ngOnChanges is called manually
        mockComponent.ngOnChanges({ property: new SimpleChange(undefined, mockComponent.property, false) });
        
        expect(native.property).toBe('dummy');
    });
});