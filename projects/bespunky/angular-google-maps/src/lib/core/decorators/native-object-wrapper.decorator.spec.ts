import { NativeObjectWrapper } from './native-object-wrapper.decorator';
import { Wrap } from './wrap.decorator';
import { OutsideAngular } from './outside-angular.decorator';
import { Wrapper } from '../abstraction/types/wrapper.type';

describe('@NativeObjectWrapper()', () =>
{
    let wrapper: MockMarkerWrapper;

    beforeEach(() => wrapper = new MockMarkerWrapper());

    it('should provide async implementation for methods marked with `@Wrap`', () =>
    {
        expect(wrapper.whatsTheTitle() instanceof Promise).toBeTruthy();
        expect(wrapper.setTitle()      instanceof Promise).toBeTruthy();
    });

    it('should call the native function when calling the wrapper method', async () =>
    {
        spyOn(wrapper.mockNative, 'getTitle');

        await wrapper.whatsTheTitle();

        expect(wrapper.mockNative.getTitle).toHaveBeenCalledTimes(1);
    });

    it('should wrap methods marked `@OutsideAngular` with async functions that wait for api ready and execute outside angular', async () =>
    {
        spyOn(wrapper.api, 'runOutsideAngular').and.callThrough();

        await wrapper.setTitle();

        expect(wrapper.api.runOutsideAngular).toHaveBeenCalledTimes(1);
    });
});

@NativeObjectWrapper
class MockMarkerWrapper implements Wrapper
{
    public mockNative = {
        getTitle: () => void 0,
        setTitle: () => void 0,
    };
    
    native = Promise.resolve(this.mockNative);
    custom: any;

    api = { runOutsideAngular: (fn: Function) => Promise.resolve(fn.call(this)) };

    @Wrap('getTitle')
    whatsTheTitle(): Promise<string> { return null; }
    
    @Wrap() @OutsideAngular
    setTitle(): Promise<any> { return null; }
}