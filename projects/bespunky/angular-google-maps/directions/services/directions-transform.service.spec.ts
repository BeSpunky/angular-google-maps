import { TestBed } from '@angular/core/testing';

import { DirectionsTransformService } from './directions-transform.service';

describe('DirectionsTransformService', () => {
  let service: DirectionsTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectionsTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
