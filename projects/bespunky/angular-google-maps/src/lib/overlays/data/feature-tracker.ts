import { IGoogleMapsFeature } from './feature/i-google-maps-feature';

export class FeatureTracker
{
    public readonly list: IGoogleMapsFeature[] = [];
    // TODO: Improve read access by maintaining an index map object

    public add(feature: IGoogleMapsFeature)
    {        
        this.list.push(feature);
    }

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

    public get isEmpty(): boolean
    {
        return this.list.length === 0;
    }
    
    public get hasFeatures(): boolean
    {
        return this.list.length > 0;
    }
}