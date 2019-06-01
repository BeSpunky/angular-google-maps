import { LazyScriptLoaderService } from '@bespunky/angular-zen';

import { GoogleMapsApiLoader } from './google-maps-api-loader';
import { GoogleMapsConfig, HttpProtocol, DefaultApiLocation, DefaultApiUrlFormat } from '../google-maps-config';

export class LazyGoogleMapsApiLoader extends GoogleMapsApiLoader
{
    constructor(private config: GoogleMapsConfig, private loader: LazyScriptLoaderService) { super(); }

    public load(): Promise<any>
    {
        return this.loader.loadScript(this.buildApiUrl()).toPromise();
    }

    private buildApiUrl(): string
    {
        const apiUrl = this.config.apiUrl;

        // If the user specified the complete url, use it directly
        if (typeof apiUrl === 'string') return apiUrl;

        // Build the url
        const settings = [];

        if (apiUrl.libraries) settings.push({ key: 'libraries', value: apiUrl.libraries.join(',') });
        if (apiUrl.language)  settings.push({ key: 'language',  value: apiUrl.language });
        if (apiUrl.region)    settings.push({ key: 'region',    value: apiUrl.region });

        // If settings were specified, join them with '&' signs
        const settingsString = settings.length ? '&' + settings.map(setting => `${setting.key}=${setting.value}`).join('&') : null;

        return DefaultApiUrlFormat.replace('{protocol}',  apiUrl.protocol || HttpProtocol.Https)
                                  .replace('{location}',  apiUrl.location || DefaultApiLocation)
                                  .replace('{key}',       apiUrl.key)
                                  .replace('{settings}',  settingsString);
    }
}