import { Injectable } from '@angular/core';

import { IGoogleMapsMouseEvent } from '../../core/abstraction/events/i-google-maps-mouse-event';
import { isGoogleMapsMouseEvent } from '../../core/abstraction/type-guards/mouse-event-type-guard';
import { GeometryTransformService } from './geometry-transform.service';

@Injectable({
    providedIn: 'root'
})
export class EventDataTransformService
{
    constructor(private geometry: GeometryTransformService) { }

    public auto(event: any): any[] | IGoogleMapsMouseEvent // TODO: | <IOtherEvents>
    {
        // If this is an array, run detection for each element and create a new array
        if (Array.isArray(event)) return event.map(this.auto.bind(this));

        // TODO: Add here any transformation calls. Must be from most derivative type to last derivative.
        //       Example: PolyMouseEvent extends MouseEvents. The check for PolyMouseEvent should preceed the one for MouseEvent.

        if (isGoogleMapsMouseEvent(event)) return this.mouseEvent(event);

        return this.default(event);
    }

    public default(event: any): any
    {
        return event;
    }

    public mouseEvent(event: google.maps.MouseEvent): IGoogleMapsMouseEvent
    {
        return {
            position: this.geometry.toCoordLiteral(event.latLng)
        };
    }

    // TODO: Add here any event args for which interpretation could be facilitated/automated
}

// ============ TODO ==============
// interface PolyMouseEvent extends MouseEvent
// {
//     edge?: number;
//     path?: number;
//     vertex?: number;
// }

// interface MouseEvent extends google.maps.MouseEvent
// {
//     feature: Data.Feature;
// }

// interface AddFeatureEvent
// {
//     feature: Data.Feature;
// }

// interface RemoveFeatureEvent
// {
//     feature: Data.Feature;
// }

// interface SetGeometryEvent
// {
//     feature: Data.Feature;
//     newGeometry: Data.Geometry;
//     oldGeometry: Data.Geometry;
// }

// interface SetPropertyEvent
// {
//     feature: Data.Feature;
//     name: string;
//     newValue: any;
//     oldValue: any;
// }

// interface RemovePropertyEvent
// {
//     feature: Data.Feature;
//     name: string;
//     oldValue: any;
// }


// interface KmlMouseEvent
// {
//     featureData: KmlFeatureData;
//     latLng: LatLng;
//     pixelOffset: Size;
// }

// interface KmlFeatureData
// {
//     author: KmlAuthor;
//     description: string;
//     id: string;
//     infoWindowHtml: string;
//     name: string;
//     snippet: string;
// }

// interface KmlAuthor
// {
//     email: string;
//     name: string;
//     uri: string;
// }

// interface MapsEngineMouseEvent
// {
//     featureId?: string;
//     infoWindowHtml?: string;
//     latLng?: LatLng;
//     pixelOffset?: Size;
// }

// /** The properties of an overlaycomplete event on a DrawingManager.. */
// interface OverlayCompleteEvent
// {
//     /** The completed overlay. */
//     overlay: Marker | Polygon | Polyline | Rectangle | Circle;
//     /** The completed overlay's type. */
//     type: OverlayType;
// }
