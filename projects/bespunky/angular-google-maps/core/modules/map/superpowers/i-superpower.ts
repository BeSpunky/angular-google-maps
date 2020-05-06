import { IGoogleMap } from '../i-google-map';

export interface ISuperpower
{
    readonly map: IGoogleMap;

    attach(map: IGoogleMap): void;
}