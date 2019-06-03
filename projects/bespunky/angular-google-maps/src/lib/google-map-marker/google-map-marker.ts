export class GoogleMapMarker
{
    private marker: google.maps.Marker;

    constructor(options?: google.maps.ReadonlyMarkerOptions)
    {
        this.marker = new google.maps.Marker(options);
    }

    public get nativeMarker(): google.maps.Marker
    {
        return this.marker;
    }
}
