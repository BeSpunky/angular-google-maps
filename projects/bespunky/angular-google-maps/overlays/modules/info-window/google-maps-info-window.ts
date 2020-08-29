
import { Subject, of      } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { GoogleMapsApiService, NativeObjectWrapper, IGoogleMap, OutsideAngular, GoogleMapsNativeObjectEmittingWrapper, BoundsLike, IGoogleMapsMouseEventsEmitter, IGoogleMapsEventData, IGoogleMapsMouseEvent, Delegation } from '@bespunky/angular-google-maps/core';
import { OverlayType                                                          } from '../../abstraction/base/overlay-type.enum';
import { IGoogleMapsInfoWindow, WrappedInfoWindowFunctions, InfoWindowTrigger } from './i-google-maps-info-window';

export interface GoogleMapsInfoWindow extends WrappedInfoWindowFunctions { }

// @dynamic
@NativeObjectWrapper<google.maps.InfoWindow, GoogleMapsInfoWindow>({
    close: Delegation.OutsideAngular
})
export class GoogleMapsInfoWindow extends GoogleMapsNativeObjectEmittingWrapper<google.maps.InfoWindow> implements IGoogleMapsInfoWindow
{
    private attachedTo: IGoogleMapsMouseEventsEmitter;
    private trigger   : InfoWindowTrigger = InfoWindowTrigger.MouseOver;
    private closeAfter: number = 0;

    private readonly detach: Subject<void> = new Subject();

    private readonly triggerEvents = {
        [InfoWindowTrigger.Click      ]: [{ emitter: () => this.attachedTo.click,       handle: this.onTriggered }],
        [InfoWindowTrigger.MouseOver  ]: [{ emitter: () => this.attachedTo.mouseOver,   handle: this.onTriggered }, { emitter: () => this.attachedTo.mouseOut, handle: this.close } ],
        [InfoWindowTrigger.DoubleClick]: [{ emitter: () => this.attachedTo.doubleClick, handle: this.onTriggered }],
        [InfoWindowTrigger.RightClick ]: [{ emitter: () => this.attachedTo.rightClick,  handle: this.onTriggered }],
    };

    constructor(api: GoogleMapsApiService, public map: IGoogleMap, options?: google.maps.InfoWindowOptions)
    {
        super(api, map, OverlayType.InfoWindow, options);
    }

    protected createNativeObject(options?: google.maps.InfoWindowOptions): google.maps.InfoWindow
    {
        return new google.maps.InfoWindow(options);
    }

    public getPosition(): google.maps.LatLngLiteral
    {
        return this.api.geometry.toLiteralCoord(this.native.getPosition());
    }
    
    @OutsideAngular
    public setPosition(element: BoundsLike): void
    {
        const center = this.api.geometry.defineBounds(element).getCenter();
        
        this.native.setPosition(center);
    }

    public getTrigger(): InfoWindowTrigger
    {
        return this.trigger;
    }
    
    public setTrigger(trigger: InfoWindowTrigger): void
    {
        if (trigger === this.trigger) return;

        this.trigger = trigger;

        this.reattachEmitters();
    }
    
    public getCloseAfter(): number
    {
        return this.closeAfter;
    }
    
    public setCloseAfter(delay: number): void
    {
        this.closeAfter = delay;
    }

    public getAttachedTo(): IGoogleMapsMouseEventsEmitter
    {
        return this.attachedTo;
    }

    public setAttachedTo(attachedTo: IGoogleMapsMouseEventsEmitter): void
    {
        if (attachedTo === this.attachedTo) return;

        this.attachedTo = attachedTo;

        this.reattachEmitters();
    }

    public clearAttachedTo(): void
    {
        this.detach.next();

        this.attachedTo = null;
    }

    @OutsideAngular
    public open(position?: BoundsLike): void
    {
        position = position || this.getPosition() || this.map.getCenter();

        this.setPosition(position);
        this.native.open(this.map.native);

        if (this.closeAfter > 0) this.autoClose();
    }

    private reattachEmitters(): void
    {
        if (!this.attachedTo) return;
        
        // Unsubscribe any previous emitter subscriptions
        this.detach.next();
        
        // Get the emitters for the specified trigger and subscribe to each while directing them to the relevant handler (open or close)
        this.triggerEvents[this.trigger].forEach(event => event.emitter()
                                                               .pipe     (takeUntil(this.detach))
                                                               .subscribe(event.handle.bind(this))
                                                );
    }

    protected onTriggered(event?: IGoogleMapsEventData): void
    {
        const position = (event.args[0] as IGoogleMapsMouseEvent).position;

        this.open(position);
    }

    private autoClose(): void
    {
        of(0).pipe(delay(this.closeAfter))
             .subscribe(() => this.native.close());
    }

    setDisableAutoPan(disableAutoPan: boolean)         : void { this.setOptions({ disableAutoPan }); }
    setMaxWidth      (maxWidth      : number)          : void { this.setOptions({ maxWidth }); }
    setPixelOffset   (pixelOffset   : google.maps.Size): void { this.setOptions({ pixelOffset }); }
}