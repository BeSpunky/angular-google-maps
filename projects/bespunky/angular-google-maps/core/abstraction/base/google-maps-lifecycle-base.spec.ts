import { Observable   } from 'rxjs';
import { SimpleChange } from '@angular/core';

import { configureGoogleMapsTestingModule, MockComponentWithLifecycle } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsComponentApiService                                } from '@bespunky/angular-google-maps/core';

describe('GoogleMapsLifecycleBase (abstract)', () =>
{
    let api          : GoogleMapsComponentApiService;
    let mockComponent: MockComponentWithLifecycle;

    beforeEach(async () =>
    {
        ({ componentApi: api, component: mockComponent } = await configureGoogleMapsTestingModule({ componentType: MockComponentWithLifecycle }));
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