/**
 * (Type Guard) Determines if the given value is a native feature options object.
 *
 * @export
 * @param {*} feature The value to test.
 * @returns {feature is google.maps.Data.FeatureOptions} `true` if the value is a native feature options object; otherwise `false`.
 */
export function isGoogleMapsFeatureOptions(feature: any): feature is google.maps.Data.FeatureOptions
{
    return !!(feature as google.maps.Data.FeatureOptions)?.geometry;
}
