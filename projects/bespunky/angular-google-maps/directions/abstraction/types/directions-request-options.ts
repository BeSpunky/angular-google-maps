/**
 * The options to pass along with a directions request.
 * 
 * Note: This is the same as `google.maps.DirectionsRequest` without `origin` and `destination`.
 *       They will be assigned by the `DirectionsService`.
 **/
export type DirectionsRequestOptions = Omit<google.maps.DirectionsRequest, 'origin' | 'destination'>;
