import { Type } from '@angular/core';

import { IGoogleMap } from '../i-google-map';

export interface ISuperpower
{
    readonly type: Type<ISuperpower>;
    readonly map: IGoogleMap;

    attach(map: IGoogleMap): void;
}