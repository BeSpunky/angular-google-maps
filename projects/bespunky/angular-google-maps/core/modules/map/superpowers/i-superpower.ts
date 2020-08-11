import { IGoogleMap } from '../i-google-map';

/**
 * Provides the contract for a single superpower implementing service.
 * Every superpower incorporated into the map should implement this interface.
 */
export interface ISuperpower
{
    /** The map the superpower is attached to. */
    readonly map: IGoogleMap;

    /**
     * Attaches the superpower to the specified map.
     *
     * @param {IGoogleMap} map The map to attach the superpowers to.
     */
    attach(map: IGoogleMap): void;
}