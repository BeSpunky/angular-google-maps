import { GoogleMapsEventsMap } from '../../types/google-maps-events-map.type';

export enum MarkerEvent
{
    /** Fired when the marker's animation property changes. */
    AnimationChanged  = 'animation_changed',
    /** Fired when the marker icon was clicked. */
    Click             = 'click',
    /** Fired for a rightclick on the marker. */
    RightClick        = 'rightclick',
    /** Fired when the marker's clickable property changes. */
    ClickableChanged  = 'clickable_changed',
    /** Fired when the marker icon was double clicked. */
    DoubleClick       = 'dblclick',
    /** Fired for a mousedown on the marker. */
    MouseDown         = 'mousedown',
    /** Fired when the mouse leaves the area of the marker icon. */
    MouseOut          = 'mouseout',
    /** Fired when the mouse enters the area of the marker icon. */
    MouseOver         = 'mouseover',
    /** Fired for a mouseup on the marker. */
    MouseUp           = 'mouseup',
    /** Fired when the marker's cursor property changes. */
    CursorChanged     = 'cursor_changed',
    /** Fired repeatedly while the user drags the marker. */
    Drag              = 'drag',
    /** Fired when the user stops dragging the marker. */
    DragEnd           = 'dragend',
    /** Fired when the marker's draggable property changes. */
    DraggableChanged  = 'draggable_changed',
    /** Fired when the user starts dragging the marker. */
    DragStart         = 'dragstart',
    /** Fired when the marker's flat property changes. */
    FlatChanged       = 'flat_changed',
    /** Fired when the marker icon property changes. */
    IconChanged       = 'icon_changed',
    /** Fired when the marker position property changes. */
    PositionChanged   = 'position_changed',
    /** Fired when the marker's shape property changes. */
    ShapeChanged      = 'shape_changed',
    /** Fired when the marker title property changes. */
    TitleChanged      = 'title_changed',
    /** Fired when the marker's visible property changes. */
    VisibleChanged    = 'visible_changed',
    /** Fired when the marker's zIndex property changes.    */
    ZIndexChanged     = 'zindex_changed'
}

// Used for iteration of known events (e.g. in case of registering listeners)
export const MarkerEventsMap: GoogleMapsEventsMap = Object.keys(MarkerEvent).map(eventName => ({ name: eventName, reference: MarkerEvent[eventName] }));
