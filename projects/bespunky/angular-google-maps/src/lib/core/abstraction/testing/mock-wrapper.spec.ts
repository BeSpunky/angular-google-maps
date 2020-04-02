import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';
import { IGoogleMapsNativeObjectWrapper } from '../base/i-google-maps-native-object-wrapper';

export class MockWrapper implements IGoogleMapsNativeObjectWrapper<IGoogleMapsNativeObject>
{
    custom: any;

    constructor(public native: IGoogleMapsNativeObject) { }
}