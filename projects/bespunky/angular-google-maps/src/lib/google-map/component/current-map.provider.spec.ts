import { TestBed } from "@angular/core/testing";
import { CurrentMapProvider } from './current-map.provider';
import { CurrentMap } from '../../core/abstraction/tokens/current-map.token';
import { BehaviorSubject } from 'rxjs';

describe('CurrentMapProvider', () =>
{
    it('Should allow creation of a new empty BehaviorSubject when injected', () =>
    {
        TestBed.configureTestingModule({ providers: [CurrentMapProvider] });

        const currentMap = TestBed.inject(CurrentMap);

        expect(currentMap instanceof BehaviorSubject).toBeTruthy();
        expect(currentMap.value).toBeNull();
    });
});