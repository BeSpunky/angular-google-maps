export function isGoogleMapsFeatureOptions(feature: any): feature is google.maps.Data.FeatureOptions
{
    return !!(feature as google.maps.Data.FeatureOptions)?.geometry;
}
