import { TestBed } from '@angular/core/testing';

import { configureGoogleMapsTestingModule } from '@bespunky/angular-google-maps/testing';
import { GoogleMapsDirectionsService      } from '@bespunky/angular-google-maps/directions';

describe('GoogleMapsDirectionsService', () =>
{
    let service: GoogleMapsDirectionsService;

    beforeEach(() =>
    {
        configureGoogleMapsTestingModule();

        service = TestBed.inject(GoogleMapsDirectionsService);
    });

    it('should be created', () => expect(service).toBeTruthy());

    
});
