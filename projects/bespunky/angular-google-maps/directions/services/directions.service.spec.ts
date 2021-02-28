import { TestBed } from '@angular/core/testing';

import { DirectionsService } from './directions.service';

describe('DirectionsService', () => {
  let service: DirectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
