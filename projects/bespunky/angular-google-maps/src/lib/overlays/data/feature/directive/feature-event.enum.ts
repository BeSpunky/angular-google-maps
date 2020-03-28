import { createEventMapProvider } from '../../../../utils/utils';

export enum FeatureEvent
{
    /** This event is fired when a feature's property is removed. */
    RemoveProperty  = 'removeproperty',
    /** This event is fired when a feature's geometry is set. */
    SetGeometry     = 'setgeometry',
    /** This event is fired when a feature's property is set. */
    SetProperty     = 'setproperty'
}

export const FeatureEventsMapProvider = createEventMapProvider(FeatureEvent);
