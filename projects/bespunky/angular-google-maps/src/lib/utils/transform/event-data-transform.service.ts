import { Injectable } from '@angular/core';

import { IGoogleMapsMouseEvent } from '../../core/abstraction/angular/events/i-google-maps-mouse-event';

@Injectable({
    providedIn: 'root'
})
export class EventDataTransformService
{
    constructor() { }

    auto(event: any): IGoogleMapsMouseEvent // TODO: | <IOtherEvents>
    {
        // if (1) return this.mouseEvent(event);

        return this.default(event);
    }

    default(event: any): any
    {
        return event;
    }

    mouseEvent(event: google.maps.MouseEvent): IGoogleMapsMouseEvent
    {
        return {
            position: { lat: event.latLng.lat(), lng: event.latLng.lng() }
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
