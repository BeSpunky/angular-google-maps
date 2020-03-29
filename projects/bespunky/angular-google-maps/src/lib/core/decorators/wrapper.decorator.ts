export const WrapperInputSymbol = Symbol('LifecycleComponent.WrapperInput');

/**
 * Marks a component @Input() member that will serve as the native wrapper.
 * Use in components/directive which inherit from `GoogleMapsLifecycleBase` to allow users of the component the flexibility of the component/directive
 * with a wrapper object of their choosing.
 * 
 * @example
 * ``` @Wrapper @Input() public map     : IGoogleMap; ```
 */
export function Wrapper(target: any, propertyName: string)
{
    Reflect.defineMetadata(WrapperInputSymbol, propertyName, target);
}