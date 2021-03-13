
import { Subject, of      } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { GoogleMapsApiService, NativeObjectWrapper, IGoogleMap, OutsideAngular, GoogleMapsNativeObjectEmittingWrapper, BoundsLike, IGoogleMapsMouseEventsEmitter, IGoogleMapsEventData, IGoogleMapsMouseEvent, Delegation } from '@bespunky/angular-google-maps/core';
import { OverlayType                                                          } from '../../abstraction/base/overlay-type.enum';
import { IGoogleMapsInfoWindow, WrappedInfoWindowFunctions, InfoWindowTrigger } from './i-google-maps-info-window';

/** Extends intellisense for `GoogleMapsInfoWindow` with native info window functions. */
export interface GoogleMapsInfoWindow extends WrappedInfoWindowFunctions { }

/**
 * The angular-ready wrapper for the native `google.maps.InfoWindow` class.
 *
 * @export
 * @class GoogleMapsInfoWindow
 * @extends {GoogleMapsNativeObjectEmittingWrapper<google.maps.InfoWindow>}
 * @implements {IGoogleMapsInfoWindow}
 */
// @dynamic
@NativeObjectWrapper<GoogleMapsInfoWindow>({
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
        [InfoWindowTrigger.MouseOver  ]: [{ emitter: () => this.attachedTo.mouseOver,   handle: this.onTriggered }, { emitter: () => this.attachedTo.mouseOut, handle: this.onTriggeredClose } ],
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

    /**
     * Gets info window's anchoring position.
     * 
     * If the window is attached to an overlay, the returned position will be the last position where the window was opened.
     *
     * @returns {google.maps.LatLngLiteral} The current info window's position.
     */
    public getPosition(): google.maps.LatLngLiteral
    {
        return this.api.geometry.toLiteralCoord(this.native.getPosition());
    }
    
    /**
     * Sets the position of the info window to the center of the specified element.
     *
     * @param {BoundsLike} element The element which center will define the new position of the info window.
     */
    @OutsideAngular
    public setPosition(element: BoundsLike): void
    {
        this.native.setPosition(this.api.geometry.centerOf(element));
    }

    /**
     * Gets the current trigger for the info window.
     *
     * @returns {InfoWindowTrigger} The current trigger for the info window.
     */
    public getTrigger(): InfoWindowTrigger
    {
        return this.trigger;
    }
    
    /**
     * Sets the trigger for the info window when attaching to an element. This implies specifying an attached element using `setAttachedTo()`.
     * Default is `InfoWindowTrigger.MouseOver`.
     * 
     * @param {InfoWindowTrigger} trigger The event that will trigger the info window.
     */
    public setTrigger(trigger: InfoWindowTrigger): void
    {
        if (trigger === this.trigger) return;

        this.trigger = trigger;

        this.reattachEmitters();
    }
    
    /**
     * Gets the delay in milliseconds after which the info window will be automatically closed.
     *
     * @returns {number} The delay in milliseconds after which the info window will be automatically closed.
     */
    public getCloseAfter(): number
    {
        return this.closeAfter;
    }
    
    /**
     * Sets the delay in milliseconds after which the info window will be automatically closed.
     * Positive values will trigger automatic close delay when the info window opens.
     * Zero and negative values will disable automatic close delay, leaving the info window open until the use manually closes it.
     *
     * @param {number} delay The delay in milliseconds after which the info window will be automatically closed.
     */
    public setCloseAfter(delay: number): void
    {
        this.closeAfter = delay;
    }

    /**
     * Gets the element the info window is attached to.
     *
     * @returns {IGoogleMapsMouseEventsEmitter} The element the info window is attached to.
     */
    public getAttachedTo(): IGoogleMapsMouseEventsEmitter
    {
        return this.attachedTo;
    }

    /**
     * Sets the element the info window will attach to.
     * Attached elements must implement `IGoogleMapsMouseEventsEmitter`.
     * 
     * When the info window is attached to an element, the info window will subscribe to the element's events (according to the current `trigger` value),
     * then open the window automatically at the position the event was triggered at.
     *
     * @param {IGoogleMapsMouseEventsEmitter} element The element to attach the info window to.
     * All overlays are by definition `IGoogleMapsMouseEventsEmitter` and can be pass here.
     */
    public setAttachedTo(attachedTo: IGoogleMapsMouseEventsEmitter): void
    {
        if (attachedTo === this.attachedTo) return;

        this.attachedTo = attachedTo;

        this.reattachEmitters();
    }

    /**
     * Clears any attached element and unsubscribes from events.
     */
    public clearAttachedTo(): void
    {
        this.detach.next();

        this.attachedTo = null;
    }

    /**
     * Opens the info window at the center of the specified element.
     *
     * @param {BoundsLike} [position] (Optional) The position or bounds like object at which center the info window should open.
     * If this is undefined, `getPosition()` will be used by default.
     * If no position has been previously specified for the info window, it will default to the map's center.
     */
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

    /**
     * Runs when the info window is triggered by the attached component.
     * 
     * By default, gets the mouse event position and opens the window at that position. Override to modify.
     *
     * @protected
     * @param {IGoogleMapsEventData} [event] The mouse event data.
     */
    protected onTriggered(event?: IGoogleMapsEventData): void
    {
        const position = (event.args[0] as IGoogleMapsMouseEvent).position;

        this.open(position);
    }

    /**
     * Runs when the attached component triggeres closing of the info window.
     *
     * By default, closes the info window. Override to modify.
     * 
     * @protected
     */
    protected onTriggeredClose(): void
    {
        this.close();
    }

    private autoClose(): void
    {
        of(0).pipe(delay(this.closeAfter))
             .subscribe(() => this.native.close());
    }

    /**
     * Option shortcut. Enables/disables auto pan if the info window is out of map bounds.
     * @see google.maps.InfoWindowOptions
     * 
     * @param {boolean} disableAutoPan `true` to disable auto pan; otherwise `false`. Default is `false`.
     */
    setDisableAutoPan(disableAutoPan: boolean)         : void { this.setOptions({ disableAutoPan }); }
    /**
     * Option shortcut. Sets the maximum width of the info window, regardless of content's width.
     * @see google.maps.InfoWindowOptions
     * 
     * @param {number} maxWidth The maximum width for tne info window.
     */
    setMaxWidth      (maxWidth      : number)          : void { this.setOptions({ maxWidth       }); }
    /**
     * Option shortcut. Sets the offset, in pixels, of the tip of the info window from the point on the map at whose geographical coordinates the info window is anchored.
     * @see google.maps.InfoWindowOptions
     * 
     * @param {google.maps.Size} pixelOffset The offset size.
     */
    setPixelOffset   (pixelOffset   : google.maps.Size): void { this.setOptions({ pixelOffset    }); }
}