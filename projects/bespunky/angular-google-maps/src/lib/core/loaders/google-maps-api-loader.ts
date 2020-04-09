import { Injectable } from '@angular/core';

/** This is a class and not an interface so it can be injected without an injection token. */
@Injectable()
export abstract class GoogleMapsApiLoader
{
    abstract load(): Promise<any>;
}
