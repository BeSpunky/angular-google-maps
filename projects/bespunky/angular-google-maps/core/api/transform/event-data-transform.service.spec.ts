import { TestBed } from '@angular/core/testing';

import { EventDataTransformService } from '@bespunky/angular-google-maps/core';

describe('EventDataTransformService', () =>
{
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () =>
    {
        const service: EventDataTransformService = TestBed.get(EventDataTransformService);
        expect(service).toBeTruthy();
    });
});
