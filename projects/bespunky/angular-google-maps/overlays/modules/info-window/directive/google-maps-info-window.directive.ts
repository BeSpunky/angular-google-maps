import { Observable } from 'rxjs';
import { Directive, Input, Output } from '@angular/core';

import { GoogleMapsComponentBase, GoogleMapsEventData, Hook, BoundsLike, IGoogleMapsMouseEventsEmitter } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsInfoWindow               } from '../i-google-maps-info-window';
import { GoogleMapsInfoWindowFactoryProvider } from '../google-maps-info-window-factory.provider';
import { InfoWindowTrigger                   } from '../i-google-maps-info-window';

@Directive({
    selector : 'bs-google-maps-info-window, [bsGoogleMapsInfoWindow]',
    exportAs : 'infoWindow',
    providers: [GoogleMapsInfoWindowFactoryProvider]
})
export class GoogleMapsInfoWindowDirective extends GoogleMapsComponentBase<IGoogleMapsInfoWindow>
{
    @Input() public animation? : google.maps.Animation;
    @Input() public position?  : BoundsLike;
    @Input() public zIndex?    : number;
    @Input() public options?   : google.maps.InfoWindowOptions;
    @Input() public trigger?   : InfoWindowTrigger;
    @Input() public closeAfter?: number;
    @Input() public attachedTo?: IGoogleMapsMouseEventsEmitter;

    /** Fired when the infoWindow's animation property changes. */
    @Hook('closeclick')       @Output() public closeClick     : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow icon was clicked. */
    @Hook('content_changed')  @Output() public contentChanged : Observable<GoogleMapsEventData>;
    /** Fired for a rightclick on the infoWindow. */
    @Hook('domready')         @Output() public domReady       : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow's clickable property changes. */
    @Hook('position_changed') @Output() public positionChanged: Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow icon was double clicked. */
    @Hook('zindex_changed')   @Output() public zIndexChanged  : Observable<GoogleMapsEventData>;
}
