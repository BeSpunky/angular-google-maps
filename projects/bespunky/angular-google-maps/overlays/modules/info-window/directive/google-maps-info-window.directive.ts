import { Observable } from 'rxjs';
import { Input, Output, Directive, AfterContentChecked } from '@angular/core';

import { GoogleMapsComponentBase, IGoogleMapsEventData, Hook, BoundsLike, IGoogleMapsMouseEventsEmitter } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsInfoWindow               } from '../i-google-maps-info-window';
import { GoogleMapsInfoWindowFactoryProvider } from '../google-maps-info-window-factory.provider';
import { InfoWindowTrigger                   } from '../i-google-maps-info-window';

@Directive({
    selector : 'bs-google-maps-info-window, [bsGoogleMapsInfoWindow]',
    exportAs : 'infoWindow',
    providers: [GoogleMapsInfoWindowFactoryProvider]
})
export class GoogleMapsInfoWindowDirective extends GoogleMapsComponentBase<IGoogleMapsInfoWindow> implements AfterContentChecked
{
    @Input() public animation? : google.maps.Animation;
    @Input() public position?  : BoundsLike;
    @Input() public zIndex?    : number;
    @Input() public options?   : google.maps.InfoWindowOptions;
    @Input() public trigger?   : InfoWindowTrigger;
    @Input() public closeAfter?: number;
    @Input() public attachedTo?: IGoogleMapsMouseEventsEmitter;

    /** Fired when the infoWindow's animation property changes. */
    @Hook('closeclick')       @Output() public closeClick: Observable<IGoogleMapsEventData>;
    /** Fired when the infoWindow icon was clicked. */
    @Hook('content_changed')  @Output() public contentChanged: Observable<IGoogleMapsEventData>;
    /** Fired for a rightclick on the infoWindow. */
    @Hook('domready')         @Output() public domReady: Observable<IGoogleMapsEventData>;
    /** Fired when the infoWindow's clickable property changes. */
    @Hook('position_changed') @Output() public positionChanged: Observable<IGoogleMapsEventData>;
    /** Fired when the infoWindow icon was double clicked. */
    @Hook('zindex_changed')   @Output() public zIndexChanged: Observable<IGoogleMapsEventData>;

    /**
     * Reviews changes to the content placed inside <bs-google-maps-info-window> and updates the window's content with any changes.
     *
     * Observing content changes could be achieved with `ContentObserver` from the `cdk` package. However, I chose not to rely on another
     * dependency, as this is specifically used in this directive. Moreover, it doesn't seem likely that info window content will change
     * often, so it didn't seem to matter.
     * If this causes a performance issue in the future, consider `ContentObserver`.
     */
    ngAfterContentChecked()
    {
        // Build a template for the updated content
        const current = this.buildContentTemplate();
        // Get the last set content template so it could be compared to the current one
        const last    = this.wrapper.getContent() as string;

        // If the content has changed (due to an *ngFor, interpolation or whatever), refresh the info window
        if (current !== last) this.wrapper.setContent(current);
    }

    private buildContentTemplate(): string
    {
        const element      = this.element.nativeElement as HTMLElement;
        const childrenHtml = Array.from(element.children).map(element => element.outerHTML).join('');

        return `<div class="google-maps-info-window">${childrenHtml}</div>`;
    }
}
