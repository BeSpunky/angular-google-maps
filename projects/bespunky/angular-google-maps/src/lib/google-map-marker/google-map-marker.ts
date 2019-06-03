import { Output, EventEmitter } from '@angular/core';

import { IGoogleMapsEventfullObject } from '../core/igoogle-maps-eventfull-object';

export class GoogleMapMarker implements IGoogleMapsEventfullObject
{
    private marker: google.maps.Marker;

    /** Fired when the marker's animation property changes. */
    @Output() public animationChanged = new EventEmitter();
    /** Fired when the marker icon was clicked. */
    @Output() public click = new EventEmitter();
    /** Fired for a rightclick on the marker. */
    @Output() public rightClick = new EventEmitter();
    /** Fired when the marker's clickable property changes. */
    @Output() public clickableChanged = new EventEmitter();
    /** Fired when the marker icon was double clicked. */
    @Output() public doubleClick = new EventEmitter();
    /** Fired for a mousedown on the marker. */
    @Output() public mouseDown = new EventEmitter();
    /** Fired when the mouse leaves the area of the marker icon. */
    @Output() public mouseOut = new EventEmitter();
    /** Fired when the mouse enters the area of the marker icon. */
    @Output() public mouseOver = new EventEmitter();
    /** Fired for a mouseup on the marker. */
    @Output() public mouseUp = new EventEmitter();
    /** Fired when the marker's cursor property changes. */
    @Output() public cursorChanged = new EventEmitter();
    /** Fired repeatedly while the user drags the marker. */
    @Output() public drag = new EventEmitter();
    /** Fired when the user stops dragging the marker. */
    @Output() public dragEnd = new EventEmitter();
    /** Fired when the marker's draggable property changes. */
    @Output() public draggableChanged = new EventEmitter();
    /** Fired when the user starts dragging the marker. */
    @Output() public dragStart = new EventEmitter();
    /** Fired when the marker's flat property changes. */
    @Output() public flatChanged = new EventEmitter();
    /** Fired when the marker icon property changes. */
    @Output() public iconChanged = new EventEmitter();
    /** Fired when the marker position property changes. */
    @Output() public positionChanged = new EventEmitter();
    /** Fired when the marker's shape property changes. */
    @Output() public shapeChanged = new EventEmitter();
    /** Fired when the marker title property changes. */
    @Output() public titleChanged = new EventEmitter();
    /** Fired when the marker's visible property changes. */
    @Output() public visibleChanged = new EventEmitter();
    /** Fired when the marker's zIndex property changes.    */
    @Output() public zIndexChanged = new EventEmitter();

    constructor(options?: google.maps.ReadonlyMarkerOptions)
    {
        this.marker = new google.maps.Marker(options);
    }

    public get nativeMarker(): google.maps.Marker
    {
        return this.marker;
    }

    listenTo(eventName: string, handler: () => void)
    {
        this.marker.addListener(eventName, handler);
    }

    stopListeningTo(eventName: string)
    {
        google.maps.event.clearListeners(this.marker, eventName);
    }
}
