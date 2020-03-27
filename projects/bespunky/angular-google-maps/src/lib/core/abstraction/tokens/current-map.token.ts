import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@angular/core';

import { IGoogleMap } from '../../../google-map/i-google-map';

/**
 * An injection token used to provide the current map object being used in the scope of a map.
 * The provider for this token should be defined only on the `GoogleMapComponent`.
 * Child components, like markers, data, polygons, can inject this token to get access to the map object they belong to.
 */
export const CurrentMap = new InjectionToken<BehaviorSubject<IGoogleMap>>('GoogleMaps.CurrentMap');
