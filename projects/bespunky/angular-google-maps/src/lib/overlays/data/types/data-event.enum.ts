import { createEventMapProvider } from '../../../utils/utils';

export enum DataEvent
{
    /** This event is fired when a feature is added to the collection. */
    AddFeature      = 'addfeature',
    /** This event is fired for a click on the geometry. */
    Click           = 'click',
    /** This event is fired for a double click on the geometry. */
    DoubleClick     = 'dblclick',
    /** This event is fired for a mousedown on the geometry. */
    MouseDown       = 'mousedown',
    /** This event is fired when the mouse leaves the area of the geometry. */
    MouseOut        = 'mouseout',
    /** This event is fired when the mouse enters the area of the geometry. */
    MouseOver       = 'mouseover',
    /** This event is fired for a mouseup on the geometry. */
    MouseUp         = 'mouseup',
    /** This event is fired when a feature is removed from the collection. */
    RemoveFeature   = 'removefeature',
    /** This event is fired when a feature's property is removed. */
    RemoveProperty  = 'removeproperty',
    /** This event is fired for a rightclick on the geometry. */
    RightClick      = 'rightclick',
    /** This event is fired when a feature's geometry is set. */
    SetGeometry     = 'setgeometry',
    /** This event is fired when a feature's property is set. */
    SetProperty     = 'setproperty'
}

export const DataEventsMapProvider = createEventMapProvider(DataEvent);
