import { GoogleMapsNativeObjectWrapper } from "../base/google-maps-native-object-wrapper";
import { GoogleMapsApiService } from '../../api/google-maps-api.service';

export class MockNativeWrapper extends GoogleMapsNativeObjectWrapper<object>
{
    constructor(api: GoogleMapsApiService, public mockNativeObject: object)
    {
        super(api);
    }

    protected createNativeObject(): object
    {
        return this.mockNativeObject;
    }
}