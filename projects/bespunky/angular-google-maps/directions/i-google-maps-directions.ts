import { ElementRef } from '@angular/core';

import { GoogleMapsComponentBase, WrappedNativeFunctions   } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay, IGoogleMapsInfoWindow } from '@bespunky/angular-google-maps/overlays';

/** A type for the native functions of a directions renderer which should be wrapped. Used along with the extension interface for the wrapper.  */
export type WrappedDirectionsFunctions = WrappedNativeFunctions<google.maps.DirectionsRenderer, 'getPanel' | 'setPanel' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

/**
 * Represents the functionality that a directions wrapper should provide.
 *
 * @export
 * @interface IGoogleMapsDirections
 * @extends {IGoogleMapsDrawableOverlay<google.maps.DirectionsRenderer>}
 * @extends {WrappedDirectionsFunctions}
 */
export interface IGoogleMapsDirections extends IGoogleMapsDrawableOverlay<google.maps.DirectionsRenderer>, WrappedDirectionsFunctions 
{
    getPanel()                                 : ElementRef;
    setPanel(element: ElementRef | HTMLElement): void;

    // ====== Option shortcuts ======
    
    setDraggable             (draggable: boolean                                                                ): void;
    setHideRouteList         (hideRouteList: boolean                                                            ): void;
    setInfoWindow            (infoWindow: GoogleMapsComponentBase<IGoogleMapsInfoWindow> | IGoogleMapsInfoWindow): void;
    setMarkerOptions         (markerOptions: google.maps.MarkerOptions                                          ): void;
    setPolylineOptions       (polylineOptions: google.maps.PolylineOptions                                      ): void;
    setPreserveViewport      (preserveViewport: boolean                                                         ): void;
    setSuppressBicyclingLayer(suppressBicyclingLayer: boolean                                                   ): void;
    setSuppressInfoWindows   (suppressInfoWindows: boolean                                                      ): void;
    setSuppressMarkers       (suppressMarkers: boolean                                                          ): void;
    setSuppressPolylines     (suppressPolylines: boolean                                                        ): void;
}
