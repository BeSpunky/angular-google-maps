import { IGoogleMap  } from '../i-google-map';
import { ISuperpower } from './i-superpower';

export abstract class Superpower implements ISuperpower
{
    private attachedMap: IGoogleMap;

    public get map(): IGoogleMap
    {
        return this.attachedMap;
    }

    public attach(map: IGoogleMap): void
    {
        this.attachedMap = map;
    }
}