// import { SimpleChange, SimpleChanges } from '@angular/core';
// import { fakeAsync, tick } from '@angular/core/testing';

// import { configureGoogleMapsTestingModule } from '../../../testing/setup.spec';
// import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
// import { MockLifecycleComponent } from '../testing/google-maps-lifecycle-base.mock.spec';
// import { GoogleMapsLifecycleBase } from './google-maps-lifecycle-base';

// describe('GoogleMapsLifecycleBase (abstract)', () =>
// {
//     let api: GoogleMapsInternalApiService;
//     let mockComponent: MockLifecycleComponent;

//     beforeEach(async () =>
//     {
//         ({ internalApi: api, component: mockComponent } = await configureGoogleMapsTestingModule({ componentType: MockLifecycleComponent }));
//     });

//     describe('basically', () =>
//     {
//         it('should create an instance', () => expect(mockComponent).toBeTruthy());

//         it('should instantiate the wrapper member', () => expect(mockComponent.wrapper).toBeDefined());

//         // it('should hook emitters and set them to the component members', () => expect(mockComponent.wrapper)
//         // {
//         // });
//     });

//     describe('when changes are detected', () =>
//     {
//         it('wait for component initialization and delegate the changes to the native object', fakeAsync(() =>
//         {
//         spyOn(api, 'delegateInputChangesToNativeObject').and.stub();
//         const changes: SimpleChanges = { value: new SimpleChange(1, 10, true) };

//             mockComponent.ngOnChanges(changes);

//             expect(api.delegateInputChangesToNativeObject).not.toHaveBeenCalled();

//             tick();

//             expect(api.delegateInputChangesToNativeObject).toHaveBeenCalledTimes(1);
//         }));
//     });
// });