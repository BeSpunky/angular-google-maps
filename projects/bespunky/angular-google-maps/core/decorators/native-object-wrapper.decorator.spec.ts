import { MockWrapper, MockNative                                                 } from '@bespunky/angular-google-maps/core/testing';
import { WrappedNativeFunctions, NativeObjectWrapper, OutsideAngular, Delegation } from '@bespunky/angular-google-maps/core';

/**
 * Most of the tests in this file are more relatable to the proxy-utils.ts file, but I chose to associate them with the decorator as
 * conceptualy the decorator is the one defining delegation override configurations which should be tested.
 */
describe('@NativeObjectWrapper()', () =>
{
    let wrapper          : TestWrapper;
    let runOutsideAngular: jasmine.Spy;

    beforeEach(() =>
    {
        wrapper           = new TestWrapper(new Native());
        runOutsideAngular = wrapper.api.runOutsideAngular;

        // Set starting values
        wrapper.native.setSomething(1);
        wrapper.native.setSomethingElse(2);

        runOutsideAngular.calls.reset();
    });

    it('should wrap outside angular all manual wrapping implementations decorated with @OutsideAngular', () =>
    {
        wrapper.doOutside();

        expect(runOutsideAngular).toHaveBeenCalledTimes(1);
    });

    it('should wrap inside angular all native getter functions', () =>
    {
        expect(wrapper.getSomething      ).toBeInstanceOf(Function);
        expect(wrapper.getSomethingElse  ).toBeInstanceOf(Function);
        expect(wrapper.getSomething()    ).toBe(wrapper.native.getSomething());
        expect(wrapper.getSomethingElse()).toBe(wrapper.native.getSomethingElse());

        expect(runOutsideAngular).not.toHaveBeenCalled();
    });

    it('should wrap outside angular all native setter functions', () =>
    {
        expect(wrapper.setSomething    ).toBeInstanceOf(Function);
        expect(wrapper.setSomethingElse).toBeInstanceOf(Function);
        
        const newValue1 = 'new something';
        const newValue2 = 'new something else';

        wrapper.setSomething(newValue1);
        wrapper.setSomethingElse(newValue2);

        expect(wrapper.native.getSomething()    ).toBe(newValue1);
        expect(wrapper.native.getSomethingElse()).toBe(newValue2);

        expect(runOutsideAngular).toHaveBeenCalledTimes(2);
    });

    it('should wrap with error all non-getter/setter functions', () => expect(() => wrapper.findById(1)).toThrowError(/excluded/));

    it('should not overwrite manual wrapping implementations', () => expect(wrapper.shouldNotOverwriteWrapper()).toBe('untouched'));

    it('should wrap inside angular native functions marked with Delegation.Direct', () =>
    {
        expect(wrapper.doNativeInside).toBeInstanceOf(Function);
        
        wrapper.doNativeInside();

        expect(runOutsideAngular).not.toHaveBeenCalled();
    });

    it('should wrap outside angular native functions marked with Delegation.OutsideAngular', () =>
    {
        expect(wrapper.doNativeOutside).toBeInstanceOf(Function);
        
        wrapper.doNativeOutside();

        expect(runOutsideAngular).toHaveBeenCalledTimes(1);
    });

    it('should wrap with error native functions marked with Delegation.Exclude', () =>
    {
        expect(() => wrapper.getExcluded()).toThrowError(/excluded/);
    });
});
class Native extends MockNative
{
    private somethingElse: any;

    public getSomethingElse(): any { return this.somethingElse; }

    public setSomethingElse(value: any): void { this.somethingElse = value; }

    public getExcluded(): any { return 'this should have been excluded. Not returned.'; }

    public shouldNotOverwriteWrapper(): any { return 'overwritten'; }

    public doNativeInside(): any { }

    public doNativeOutside(): any { }
}

@NativeObjectWrapper<Native, TestWrapper>({
    getExcluded    : Delegation.Exclude,
    doNativeInside : Delegation.Direct,
    doNativeOutside: Delegation.OutsideAngular
})
class TestWrapper extends MockWrapper<Native>
{
    @OutsideAngular
    public doOutside() { }

    public shouldNotOverwriteWrapper(): any { return 'untouched'; }
}

interface TestWrapper extends WrappedNativeFunctions<Native> { }
