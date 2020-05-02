import { MockWrapper, MockNative, NativeObjectWrapper, Wrapper } from '@bespunky/angular-google-maps/core/testing';

describe('@NativeObjectWrapper()', () =>
{
    let wrapper: MockWrapper;

    beforeEach(() => wrapper = new MockWrapper(new MockNative()));

    it('should provide an implementation for methods marked with `@Wrap`', () => expect(() => wrapper.getProperty()).not.toThrow());

    it('should call the native function when calling the wrapper method', () =>
    {
        spyOn(wrapper.native, 'getProperty');

        wrapper.getProperty();

        expect(wrapper.native.getProperty).toHaveBeenCalledTimes(1);
    });
    
    // Also tests renaming wrapped functions
    it('should pass args to the native function and provide its return value', () =>
    {
        const nativeGetter = spyOn(wrapper.native, 'findById');

        const result       = wrapper.find(123);
        const nativeResult = nativeGetter.calls.mostRecent().returnValue;

        expect(wrapper.native.findById).toHaveBeenCalledTimes(1);
        expect(nativeGetter.calls.mostRecent().args[0]).toBe(123);
        expect(result).toBe(nativeResult);
    });

    it('should wrap methods marked `@OutsideAngular` with function that executes outside angular', () =>
    {
        wrapper.setProperty(123);

        expect(wrapper.api.runOutsideAngular).toHaveBeenCalledTimes(1);
    });

    it('should warn if no method was marked for wrapping', () =>
    {
        const warn = spyOn(console, 'warn');

        class NoWrappers implements Wrapper { native: any; custom: any; }

        NativeObjectWrapper(NoWrappers);

        expect(warn).toHaveBeenCalledTimes(1);
        expect(warn.calls.mostRecent().args[0]).toMatch(/No method marked/);
    });
});