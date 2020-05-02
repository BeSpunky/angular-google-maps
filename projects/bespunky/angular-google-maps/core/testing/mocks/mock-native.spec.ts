import { IGoogleMapsNativeObject } from '@bespunky/angular-google-maps/core';

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