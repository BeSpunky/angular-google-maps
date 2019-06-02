export enum MapEvent
{
    BoundsChanged     = 'bounds_changed',
    CenterChanged     = 'center_changed',
    ZoomChanged       = 'zoom_changed',
    Click             = 'click',
    RightClick        = 'rightclick',
    DoubleClick       = 'dblclick',
    MouseMove         = 'mousemove',
    MouseOver         = 'mouseover',
    MouseOut          = 'mouseout',
    Drag              = 'drag',
    DragStart         = 'dragstart',
    DragEnd           = 'dragend',
    HeadingChanged    = 'heading_changed',
    MaptTypeChanged   = 'maptypeid_changed',
    ProjectionChanged = 'projection_changed',
    Resize            = 'resize',
    TilesLoaded       = 'tilesloaded',
    TiltChanged       = 'tilt_changed',
    Idle              = 'idle'
}
