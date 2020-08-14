import { TestBed } from '@angular/core/testing';

import { AngularGoogleMapsService } from './angular-google-maps.service';

describe('AngularGoogleMapsService', () => {
  let service: AngularGoogleMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularGoogleMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
