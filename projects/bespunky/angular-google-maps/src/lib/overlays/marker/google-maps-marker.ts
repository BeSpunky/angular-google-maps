import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsDrawableOverlay } from '../../core/abstraction/base/google-maps-drawable-overlay';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { IGoogleMapsMarker } from './i-google-maps-marker';
import { OverlayType } from '../../core/abstraction/base/overlay-type.enum';
import { NativeObjectWrapper } from '../../core/decorators/native-object-wrapper.decorator';
import { Wrap } from '../../core/decorators/wrap.decorator';
import { OutsideAngular } from '../../core/decorators/outside-angular.decorator';
  
@NativeObjectWrapper
export class GoogleMapsMarker extends GoogleMapsDrawableOverlay<google.maps.Marker> implements IGoogleMapsMarker
{
    constructor(public map: IGoogleMap, api: GoogleMapsApiService, private options?: google.maps.ReadonlyMarkerOptions)
    {
        super(OverlayType.Marker, map, api);
    }

    protected createNativeObject(): google.maps.Marker
    {
        return new google.maps.Marker(this.options);
    }

    @Wrap()
    getPosition(): Promise<google.maps.LatLng> { return null; }
    
    @Wrap() @OutsideAngular
    setPosition(position: google.maps.LatLng | google.maps.LatLngLiteral): Promise<void> { return null; }
}
