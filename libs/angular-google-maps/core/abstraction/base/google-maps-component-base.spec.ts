import { Observable   } from 'rxjs';
import { SimpleChange } from '@angular/core';

import { configureGoogleMapsTestingModule } from '@bespunky/angular-google-maps/testing';
import { MockComponent                    } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsComponentApiService    } from '@bespunky/angular-google-maps/core';

describe('GoogleMapsComponentBase (abstract)', () =>
{
    let api          : GoogleMapsComponentApiService;
    let mockComponent: MockComponent;

    beforeEach(async () =>
    {
        ({ componentApi: api, component: mockComponent } = await configureGoogleMapsTestingModule({ componentType: MockComponent }));
    });

    it('should create an instance', () => expect(mockComponent).toBeTruthy());

    it('should instantiate the wrapper member', () => expect(mockComponent.wrapper).toBeDefined());

    it('should assign emitters to the component @Output members', () => expect(mockComponent.click).toBeInstanceOf(Observable));

    it('delegate @Input changes to the native object', () =>
    {
        const native = mockComponent.wrapper.native;

        expect(native.something).toBeUndefined();

        mockComponent.something = 'dummy';

        // As changes are not made from a host template, ngOnChanges is called manually
        mockComponent.ngOnChanges({ something: new SimpleChange(undefined, mockComponent.something, false) });
        
        expect(native.something).toBe('dummy');
    });
});