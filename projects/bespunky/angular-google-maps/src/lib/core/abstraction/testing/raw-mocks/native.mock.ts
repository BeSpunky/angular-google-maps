import { IGoogleMapsNativeObject } from '../../native/i-google-maps-native-object';

export class MockNative implements IGoogleMapsNativeObject
{
    public fakeProperty: any;

    public getProperty(): any
    {
        return this.fakeProperty;
    }

    public setProperty(value: any): void
    {
        this.fakeProperty = value;
    }
}