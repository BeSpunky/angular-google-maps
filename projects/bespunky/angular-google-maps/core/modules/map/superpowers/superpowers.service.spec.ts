import { TestBed } from '@angular/core/testing';

import { SuperpowersService } from './superpowers.service';

describe('SuperpowersService', () => {
  let service: SuperpowersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperpowersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
