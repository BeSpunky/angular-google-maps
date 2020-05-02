import { TestBed } from '@angular/core/testing';

import { GoogleMapsComponentApiService } from './google-maps-component-api.service';

describe('GoogleMapsComponentApiService', () => {
  let service: GoogleMapsComponentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapsComponentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
