/**
 * A token class to extend when injecting a native service. Declared for scalability.
 * 
 * The library defines independent providers for native and wrapper factories at the component level to ensure they are mockable
 * when testing them as injected dependencies. Native services however, should be singleton and provided in root level (not the component level).
 *
 * As services are classes, they can be used as token, which means they can be mocked simply by providing a new value for the class.
 * For example:  
 * `{ provide: SomeService, useValue: mockService }`
 *
 * This opens a new puzzle: Where would the native service object be instantiated?
 * Creating a factory provider to instantiate it and provide it into the wrapper service means the provided should be declared
 * somewhere. Where though? in the module? this means adding a `.forRoot()` 
 *  
 * To simplify life for the user, avoid the `.forRoot()` implementation and follow service tree-shaking rules, native services will also be wrapped.
 * Well, half wrapped. Every native singleton service will be created as an Angular service provided in root, and implement a constructor
 * that returns an instance of the native service:
 * 
 * ```typescript
 * .@Injectable({ providedIn: 'root' })
 * export class SomeNativeService
 * {
 *     constructor()
 *     {
 *         return new google.maps.SomeNativeService();
 *     }
 * }
 * ```
 * 
 * Now the `SomeNativeService` class instance will actually become the native object.
 * This makes the native object injectable at root level and mockable using the `SomeNativeService` class.
 * 
 * For scalability, native services "half-wrappers" like the one above should extends `NativeServiceToken`.
 * ```typescript
 * .@Injectable({ providedIn: 'root' })
 * export class SomeNativeService extends NativeServiceToken
 * {
 *     constructor()
 *     {
 *         super();
 * 
 *         return new google.maps.SomeNativeService();
 *     }
 * }
 * ```
 * 
 * The missing piece for the native service is providing intellisense. See the `WrappedNativeFunctions` type.
 * 
 * Service wrapper classes should extend `GoogleMapsNativeObjectWrapper` with the same rules as other wrappers, only they should
 * use type the native argument in the constructor so it matches the "half-wrapper" of the native object.
 * 
 * ```typescript
 * .@Injectable({ providedIn: 'root' })
 * .@NativeObjectWrapper<SomeNativeWrapperService>(...)
 * export class SomeNativeWrapperService extends GoogleMapsNativeObjectWrapper<google.maps.SomeNativeService>
 * {
 *     constructor(..., native: SomeNativeService)
 *     {
 *         super(..., native);
 *     }
 * }
 * ```
 * 
 * @export
 * @abstract
 * @class NativeServiceToken
 */
export abstract class NativeServiceToken { }