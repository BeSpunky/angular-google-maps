import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';

export class MockNative implements IGoogleMapsNativeObject
{
    public property: any;
    
    public getProperty(): any
    {
        return this.property;
    }

    public setProperty(value: any): void
    {
        this.property = value;
    }

    public findById(id: any)
    {
        return `item ${id}`;
    }
}