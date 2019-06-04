import { TestBed } from '@angular/core/testing';

import { EventDataTransformerService } from './event-data-transformer.service';

describe('EventDataTransformerService', () =>
{
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () =>
    {
        const service: EventDataTransformerService = TestBed.get(EventDataTransformerService);
        expect(service).toBeTruthy();
    });
});
