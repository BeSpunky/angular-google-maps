import { GoogleMapsNativeObjectEmittingWrapper } from "../base/google-maps-native-object-emitting-wrapper";
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';

export class MockEmittingWrapper extends GoogleMapsNativeObjectEmittingWrapper<IGoogleMapsNativeObject>
{
    constructor(api: GoogleMapsApiService, public mockNativeObject: IGoogleMapsNativeObject)
    {
        super(api);
    }

    public createNativeObject(): IGoogleMapsNativeObject
    {
        return this.mockNativeObject;
    }
}