import { Type } from '@angular/core';
import { IGoogleMapsNativeObject } from '../abstraction/native/i-google-maps-native-object';
import { IGoogleMapsNativeObjectWrapper } from '../abstraction/base/i-google-maps-native-object-wrapper';

export interface NativeObjectWrapperDefinition
{
    nativeType: Type<IGoogleMapsNativeObject>,
    specialGetters?: { [name: string]: boolean } // e.g. { getMap: false } to exclude getMap(); { getFeatureById: true } to include getFeatureById()
    specialSetters?: { [name: string]: boolean } // e.g. { setMap: false } to exclude setMap(); { add: true } to include add()
}

export function NativeObjectWrapper(wrapperDef: NativeObjectWrapperDefinition)
{
    const { nativeType, specialGetters, specialSetters } = wrapperDef;

    function shouldWrap(nativeName: string, specials: { [name: string]: boolean } = {}, regex: RegExp)
    {
        // Wrap only functions that match the getter/setter pattern and weren't excluded (i.e. they weren't configured with `false`),
        // or functions that were included (i.e. they were configured with `true`)
        if (specials[nativeName] === undefined) return nativeName.match(regex);

        return specials[nativeName];
    }

    return function NativeObjectWrapperDecorator(wrapper: Type<IGoogleMapsNativeObjectWrapper>): void
    {
        const excluded = ['constructor'];

        const properties = Object.getOwnPropertyNames(nativeType.prototype).filter(name => !excluded.includes(name));
        const getters = properties.filter(name => shouldWrap(name, specialGetters, /^get[A-Z]/));
        const setters = properties.filter(name => shouldWrap(name, specialSetters, /^set[A-Z]/));

        getters.forEach(getter => 
        {
            wrapper.prototype[getter] = async function(...args: any[])
            {
                return (await this.native)[getter](...args);
            };
        });

        setters.forEach(setter =>
        {
            wrapper.prototype[setter] = function(...args: any[])
            {
                return this.api.runOutsideAngular(() => this.nativeObject[setter](...args));
            };
        });
    }
}