import { IGoogleMapsFeature } from '../feature/i-google-maps-feature';

/**
 * Automates and facilitates tracking of geometry features in a data layer.
 *
 * @export
 * @class FeatureTracker
 */
export class FeatureTracker
{
    /**
     * The list of features that are currently present on the data layer.
     *
     * @type {IGoogleMapsFeature[]}
     */
    public readonly list: IGoogleMapsFeature[] = [];
    // TODO: Improve read access by maintaining an index map object

    /**
     * Registeres a feature as added.
     *
     * @param {IGoogleMapsFeature} feature
     */
    public add(feature: IGoogleMapsFeature)
    {        
        this.list.push(feature);
    }
    
    /**
     * Unregisteres a removed feature from the tracker.
     *
     * @param {(google.maps.Data.Feature)} feature The feature to remove from the list.
     * @returns {IGoogleMapsFeature} The removed feature or `null` if not found.
     */
    public remove(feature    : google.maps.Data.Feature)                                       : IGoogleMapsFeature;
    /**
     * Unregisteres a removed feature from the tracker.
     *
     * @param {(IGoogleMapsFeature)} feature The feature to remove from the list.
     * @returns {IGoogleMapsFeature} The removed feature or `null` if not found.
     */
    public remove(feature    : IGoogleMapsFeature)                                             : IGoogleMapsFeature;
    /**
     * Unregisteres a removed feature from the tracker.
     *
     * @param {(string | number)} featureId The id of the feature to remove from the list.
     * @returns {IGoogleMapsFeature} The removed feature or `null` if not found.
     */
    public remove(featureId  : string | number)                                                : IGoogleMapsFeature;
    /**
     * @ignore
     */
    public remove(featureOrId: string | number | google.maps.Data.Feature | IGoogleMapsFeature): IGoogleMapsFeature;
    public remove(featureOrId: string | number | google.maps.Data.Feature | IGoogleMapsFeature): IGoogleMapsFeature
    {
        // If it's a native feature, use it
        const index = featureOrId instanceof google.maps.Data.Feature ? this.list.findIndex(feature => feature.native === featureOrId) :
            // If it's a wrapping feature, fetch native and use it
            typeof featureOrId === 'object' ? this.list.indexOf(featureOrId) :
                // This is an id, find feature and use it
                this.list.findIndex(feature => feature.getId() === featureOrId);

        if (index === -1) return null;
        
        const feature = this.list[index];

        this.list.splice(index, 1);

        return feature;
    }

    /**
     * `true` if the tracker doesn't have any features registered; otherwise `false`.
     *
     * @readonly
     * @type {boolean}
     */
    public get isEmpty(): boolean
    {
        return this.list.length === 0;
    }
    
    /**
     * `true` if the tracker has at least one registered feature; otherwise `false`.
     *
     * @readonly
     * @type {boolean}
     */
    public get hasFeatures(): boolean
    {
        return this.list.length > 0;
    }
}