import { Injectable } from '@angular/core';

@Injectable()
export abstract class GoogleMapsApiLoader
{
    abstract load(): Promise<any>;
}
