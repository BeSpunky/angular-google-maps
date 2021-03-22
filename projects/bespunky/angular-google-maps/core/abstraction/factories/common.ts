import { InjectionToken } from '@angular/core';

/**
 * Defines the configuration for a function that generates a factory provider.
 *
 * @export
 * @interface FactoryGeneratorConfig
 * @template TToken The type of token the created factory will be provided for.
 */
export interface FactoryGeneratorConfig<TToken>
{
    /**
     * (Optional) The token for which the generated factory should be provided for. Default value depends on the generator implementation.
     *
     * @type {InjectionToken<TToken>}
     */
    token?: InjectionToken<TToken>;
    /**
     * (Optional) Any additional dependencies the factory will need.
     *
     * @type {any[]}
     */
    deps? : any[];
}
