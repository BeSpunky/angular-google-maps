// import { TestBed } from '@angular/core/testing';

// import { GeometryTransformService } from './geometry-transform.service';

// describe('GeometryTransformService', () =>
// {
//     let service: GeometryTransformService;

//     beforeEach(() =>
//     {
//         TestBed.configureTestingModule({});
//         service = TestBed.inject(GeometryTransformService);
//     });

//     it('should be created', () => expect(service).toBeTruthy());

//     describe('toCoordLiteral', () =>
//     {
//         it('should transform google.maps.LatLng objects to literals', () =>
//         {
//             const coord = service.toCoordLiteral(new google.maps.LatLng(20, 20));
            
//             expect(coord.lat).toBe(20);
//             expect(coord.lng).toBe(20);
//         });
        
//         it('should return the same object if a literal was passed', () =>
//         {
//             const coord = { lat: 20, lng: 20 };

//             expect(service.toCoordLiteral(coord)).toBe(coord);
//         });
//     });
// });
