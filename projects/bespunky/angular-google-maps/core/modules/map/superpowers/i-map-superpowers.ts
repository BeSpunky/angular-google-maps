import { Type } from '@angular/core';

import { IMapSuperpower } from './i-map-superpower';

export interface IMapSuperpowers
{
    use<T extends IMapSuperpower>(type: Type<T>): T;
}