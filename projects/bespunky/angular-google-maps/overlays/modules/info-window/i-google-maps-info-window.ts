import { WrappedNativeFunctions, IGoogleMapsNativeObjectEmittingWrapper, BoundsLike, IGoogleMapsMouseEventsEmitter } from '@bespunky/angular-google-maps/core';

/**
 * The supported triggers for opening the info window:
 * 
 * `click`       - The info window will open when the user clicks the attached element.  
 * `mouseOver`   - The info window will open when the user enters the attached element with the mouse and close when the user exists the attached element.  
 * `doubleClick` - The info window will open when the user double clicks the attached element.  
 * `rightClick`  - The info window will open when the user right clicks the attached element.
 */
export type InfoWindowTrigger = 'click' | 'mouseOver' | 'doubleClick' | 'rightClick';

/** A type for the native functions of an info window which should be wrapped. Used along with the extension interface for the wrapper. */
export type WrappedInfoWindowFunctions = WrappedNativeFunctions<google.maps.InfoWindow, 'getPosition' | 'setPosition' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'get' | 'set' | 'changed' | 'open'>;

/**
 * Represents the functionality that an info window should provide.
 *
 * @export
 * @interface IGoogleMapsInfoWindow
 * @extends {IGoogleMapsNativeObjectEmittingWrapper<google.maps.InfoWindow>}
 * @extends {WrappedInfoWindowFunctions}
 */
export interface IGoogleMapsInfoWindow extends IGoogleMapsNativeObjectEmittingWrapper<google.maps.InfoWindow>, WrappedInfoWindowFunctions 
{
    /**
     * Gets info window's anchoring position.
     * 
     * If the window is attached to an overlay, the returned position will be the last position where the window was opened.
     *
     * @returns {google.maps.LatLngLiteral} The current info window's position.
     */
    getPosition(): google.maps.LatLngLiteral;
    /**
     * Sets the position of the info window to the center of the specified element.
     *
     * @param {BoundsLike} element The element which center will define the new position of the info window.
     */
    setPosition(element: BoundsLike): void;

    /**
     * Gets the current trigger for the info window.
     *
     * @returns {InfoWindowTrigger} The current trigger for the info window.
     */
    getTrigger(): InfoWindowTrigger;
    /**
     * Sets the trigger for the info window when attaching to an element. This implies specifying an attached element using `setAttachedTo()`.
     * Default is `mouseOver`.
     * 
     * @param {InfoWindowTrigger} trigger The event that will trigger the info window.
     */
    setTrigger(trigger: InfoWindowTrigger): void;

    /**
     * Gets the delay in milliseconds after which the info window will be automatically closed.
     *
     * @returns {number} The delay in milliseconds after which the info window will be automatically closed.
     */
    getCloseAfter(): number;
    /**
     * Sets the delay in milliseconds after which the info window will be automatically closed.
     * Positive values will trigger automatic close delay when the info window opens.
     * Zero and negative values will disable automatic close delay, leaving the info window open until the use manually closes it.
     *
     * @param {number} delay The delay in milliseconds after which the info window will be automatically closed.
     */
    setCloseAfter(delay: number): void;

    /**
     * Gets the element the info window is attached to.
     *
     * @returns {IGoogleMapsMouseEventsEmitter} The element the info window is attached to.
     */
    getAttachedTo(): IGoogleMapsMouseEventsEmitter;
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
    setAttachedTo(element: IGoogleMapsMouseEventsEmitter): void;
    /**
     * Clears any attached element and unsubscribes from events.
     */
    clearAttachedTo(): void;

    /**
     * Opens the info window at the center of the specified element.
     *
     * @param {BoundsLike} [position] (Optional) The position or bounds like object at which center the info window should open.
     * If this is undefined, `getPosition()` will be used by default.
     * If no position has been previously specified for the info window, it will default to the map's center.
     */
    open(position?: BoundsLike): void;

    /**
     * Option shortcut. Enables/disables auto pan if the info window is out of map bounds.
     * @see google.maps.InfoWindowOptions
     * 
     * @param {boolean} disableAutoPan `true` to disable auto pan; otherwise `false`. Default is `false`.
     */
    setDisableAutoPan(disableAutoPan: boolean): void;
    /**
     * Option shortcut. Sets the maximum width of the info window, regardless of content's width.
     * @see google.maps.InfoWindowOptions
     * 
     * @param {number} maxWidth The maximum width for tne info window.
     */
    setMaxWidth(maxWidth: number): void;
    /**
     * Option shortcut. Sets the offset, in pixels, of the tip of the info window from the point on the map at whose geographical coordinates the info window is anchored.
     * @see google.maps.InfoWindowOptions
     * 
     * @param {google.maps.Size} pixelOffset The offset size.
     */
    setPixelOffset(pixelOffset: google.maps.Size): void;
}
