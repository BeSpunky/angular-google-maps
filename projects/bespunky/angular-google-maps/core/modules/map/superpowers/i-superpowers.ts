import { Type } from '@angular/core';

import { IGoogleMap     } from '../i-google-map';
import { ISuperpower } from './i-superpower';

export interface ISuperpowers
{
    use<T extends ISuperpower>(type: Type<T>): T;

    attachToMap(map: IGoogleMap): void;
}