import { IGoogleMapsFeature } from './feature/i-google-maps-feature';

export class FeatureTracker
{
    public readonly features: IGoogleMapsFeature[] = [];

    public add(feature: IGoogleMapsFeature)
    {        
        this.features.push(feature);
    }

    public remove(featureOrId: string | number | google.maps.Data.Feature | IGoogleMapsFeature): IGoogleMapsFeature
    {
        // If it's a native feature, use it
        const index = featureOrId instanceof google.maps.Data.Feature ? this.features.findIndex(feature => feature.native === featureOrId) :
            // If it's a wrapping feature, fetch native and use it
            typeof featureOrId === 'object' ? this.features.indexOf(featureOrId) :
                // This is an id, find feature and use it
                this.features.findIndex(feature => feature.getId() === featureOrId);

        if (index === -1) return null;
        
        const feature = this.features[index];

        this.features.splice(index, 1);

        return feature;
    }
}