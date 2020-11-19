import { Injectable        } from '@angular/core';
import { LazyLoaderService } from '@bespunky/angular-zen/async';

import { GoogleMapsApiLoader                                       } from '@bespunky/angular-google-maps/core';
import { GoogleMapsConfig, DefaultApiLocation, DefaultApiUrlFormat } from './google-maps-config';

/**
 * Lazy loads Google Maps API according to the configuration provided when importing `GoogleMapsModule.forRoot()`.
 *
 * @export
 * @class LazyGoogleMapsApiLoader
 * @extends {GoogleMapsApiLoader}
 */
@Injectable({
    providedIn: 'root'
})
export class LazyGoogleMapsApiLoader extends GoogleMapsApiLoader
{
    constructor(private config: GoogleMapsConfig, private loader: LazyLoaderService) { super(); }

    /**
     * Builds the maps api url and loads it as a script on the page.
     *
     * @returns {Promise<any>}
     */
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
        const settingsString = settings.length ? '&' + settings.map(setting => `${setting.key}=${setting.value}`).join('&') : '';

        return DefaultApiUrlFormat.replace('{protocol}',  apiUrl.protocol || 'https')
                                  .replace('{location}',  apiUrl.location || DefaultApiLocation)
                                  .replace('{key}',       apiUrl.key)
                                  .replace('{settings}',  settingsString);
    }
}
