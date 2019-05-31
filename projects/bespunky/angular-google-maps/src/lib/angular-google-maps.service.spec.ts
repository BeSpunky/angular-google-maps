import { TestBed } from '@angular/core/testing';

import { AngularGoogleMapsService } from './angular-google-maps.service';

describe('AngularGoogleMapsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularGoogleMapsService = TestBed.get(AngularGoogleMapsService);
    expect(service).toBeTruthy();
  });
});
