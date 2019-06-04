import { TestBed } from '@angular/core/testing';

import { GoogleMapsApiService } from './google-maps-api.service';

describe('GoogleMapsApiService', () =>
{
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () =>
    {
        const service: GoogleMapsApiService = TestBed.get(GoogleMapsApiService);
        expect(service).toBeTruthy();
    });
});
