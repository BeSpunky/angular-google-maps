import { LazyScriptLoaderService } from '@bespunky/angular-zen';

import { GoogleMapsApiLoader } from './google-maps-api-loader';
import { GoogleMapsConfig, DefaultApiUrlFormat } from '../google-maps.module';

export class LazyGoogleMapsApiLoader extends GoogleMapsApiLoader
{
    constructor(private config: GoogleMapsConfig, private loader: LazyScriptLoaderService) { super(); }

    public load(): Promise<any>
    {
        return this.loader.loadScript(this.createApiUrl()).toPromise();
    }

    private createApiUrl(): string
    {
        return (this.config.apiUrlFormat || DefaultApiUrlFormat).replace('{apiKey}', this.config.apiKey);
    }
}
