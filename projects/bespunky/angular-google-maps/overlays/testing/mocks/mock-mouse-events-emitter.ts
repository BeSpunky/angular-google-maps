import { Observable } from 'rxjs';
import { ElementRef } from '@angular/core';

import { Hook, IGoogleMapsEventData, GoogleMapsComponentApiService, Coord, IGoogleMapsMouseEvent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayComponentBase, GoogleMapsInfoWindow                                    } from '@bespunky/angular-google-maps/overlays';
import { MockDrawableOverlay       } from './mock-drawable-overlay';
import { MockNativeDrawableOverlay } from './mock-native-drawable-overlay';

/**
 * Used for testing of an info window.
 *
 * @export
 * @class MockMouseEventsEmitter
 * @extends {GoogleMapsOverlayComponentBase<MockDrawableOverlay<MockNativeDrawableOverlay>>}
 */
export class MockMouseEventsEmitter extends GoogleMapsOverlayComponentBase<MockDrawableOverlay<MockNativeDrawableOverlay>>
{
    @Hook() click      : Observable<IGoogleMapsEventData>;
    @Hook() doubleClick: Observable<IGoogleMapsEventData>;
    @Hook() mouseDown  : Observable<IGoogleMapsEventData>;
    @Hook() mouseOut   : Observable<IGoogleMapsEventData>;
    @Hook() mouseOver  : Observable<IGoogleMapsEventData>;
    @Hook() mouseUp    : Observable<IGoogleMapsEventData>;
    @Hook() rightClick : Observable<IGoogleMapsEventData>;
    
    constructor(private componentApi: GoogleMapsComponentApiService, infoWindow: GoogleMapsInfoWindow)
    {
        super(componentApi, new MockDrawableOverlay(infoWindow.map, new MockNativeDrawableOverlay()), new ElementRef(null));      
    }

    private emit(eventName: string, position: Coord)
    {
        const mouseEvent: IGoogleMapsMouseEvent = { position: this.componentApi.api.geometry.toLiteralCoord(position) };

        this.wrapper.events.raise(eventName, mouseEvent);
    }

    public emitClick      (position: Coord) { this.emit('click', position);       }
    public emitMousOver   (position: Coord) { this.emit('mouseOver', position);   }
    public emitMouseOut   (position: Coord) { this.emit('mouseOut', position);    }
    public emitDoubldClick(position: Coord) { this.emit('doubleClick', position); }
    public emitRightClick (position: Coord) { this.emit('rightClick', position);  }
    
    /**
     * `true` if there are no event subscribers at all; otherwise `false`.
     */
    public get isDetached(): boolean
    {        
        return Object.keys(this.listeners).reduce<boolean>((noListeners, eventName) => noListeners && !this.listeners[eventName].length, true);
    }

    public get listeners(): {}
    {
        return this.wrapper.events.listeners;
    }
}