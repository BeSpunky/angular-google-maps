import { IGoogleMapsNativeObject } from '@bespunky/angular-google-maps/core';

export class MockNative implements IGoogleMapsNativeObject
{
    public something: any;
    
    public getSomething(): any
    {
        return this.something;
    }

    public setSomething(value: any): void
    {
        this.something = value;
    }

    public findById(id: any)
    {
        return `item ${id}`;
    }
}