import { SimpleChange, Component, Output, EventEmitter, Input } from '@angular/core';

import { configureGoogleMapsTestingModule } from '../../../testing/setup.spec';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { GoogleMapsLifecycleBase } from './google-maps-lifecycle-base';
import { MockEmittingWrapper } from '../testing/mock-emitting-wrapper.spec';
import { WrapperFactory } from '../tokens/wrapper-factory.token';
import { MockNative } from '../testing/mock-native.spec';
import { GoogleMapsEventData } from '../events/google-maps-event-data';
import { Observable } from 'rxjs';
import { Hook } from '../../decorators/hook.decorator';

describe('GoogleMapsLifecycleBase (abstract)', () =>
{
    let api          : GoogleMapsInternalApiService;
    let mockComponent: GoogleMapsLifecycleBaseTest;

    beforeEach(async () =>
    {
        ({ internalApi: api, component: mockComponent } = await configureGoogleMapsTestingModule({ componentType: GoogleMapsLifecycleBaseTest }));
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

function CreateWrapperFactoryProvider()
{
    return () => new MockEmittingWrapper(new MockNative());
}

@Component({
    providers: [{ provide: WrapperFactory, useFactory: CreateWrapperFactoryProvider }]
})
class GoogleMapsLifecycleBaseTest extends GoogleMapsLifecycleBase<MockEmittingWrapper>
{
    @Input() property: any;

    @Hook() @Output() click: EventEmitter<GoogleMapsEventData>;
}