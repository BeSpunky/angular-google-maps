import { ElementRef } from '@angular/core';

import { WrappedNativeFunctions     } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay } from '@bespunky/angular-google-maps/overlays';

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
    getPanel()                   : ElementRef;
    setPanel(element: ElementRef): void;
}
