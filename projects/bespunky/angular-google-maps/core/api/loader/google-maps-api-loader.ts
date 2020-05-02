/**
 * Library users who want to provide their own loader should inherit this class.
 * 
 * === Why this file: ===
 * Originally, the class resided in the core module. When the _internal module was created and the internal api class was moved there,
 * it created a circular dependency between _internal and core.
 * This file is simply a delegator to allow the user to inherit the GoogleMapsApiLoader class from the _internal package, without exposing it (as it is internal of course).
 **/
import { Injectable } from '@angular/core';

import { GoogleMapsApiLoader as GoogleMapsApiLoaderBase } from '@bespunky/angular-google-maps/_internal';

@Injectable()
export abstract class GoogleMapsApiLoader extends GoogleMapsApiLoaderBase { }
