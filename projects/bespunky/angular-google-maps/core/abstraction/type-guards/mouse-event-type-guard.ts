export function isGoogleMapsMouseEvent(event: any): event is google.maps.MouseEvent
{
    return (event as google.maps.MouseEvent).latLng !== undefined;
}
