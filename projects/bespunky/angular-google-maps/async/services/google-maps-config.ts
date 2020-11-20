/** The placeholders structure that will be used to construct full url to Google Maps API. */
export const DefaultApiUrlFormat = '{protocol}://{location}?key={key}{settings}';
/** The default host and route for Google Maps API as specified in their docs. */
export const DefaultApiLocation = 'maps.googleapis.com/maps/api/js';

/** https://developers.google.com/maps/documentation/javascript/libraries */
export enum GoogleMapsLibrary
{
    Drawing         = 'drawing',
    Geometry        = 'geometry',
    Places          = 'places',
    Visualization   = 'visualization'
}

/**
 * Represents the parts of the url to the JavaScript API of Google Maps.
 *
 * @export
 * @class GoogleApiUrl
 */
export interface GoogleApiUrl
{
    /**
     * The protocol to fetch the API through.
     *
     * @type {('http' | 'https')}
     */
    protocol?: 'http' | 'https';

    /**
     * The url pointing to the API.
     *
     * @type {string}
     */
    location?: string;

    /**
     * The API key created you created on https://developers.google.com/maps/documentation/javascript/get-api-key.
     *
     * @type {string}
     */
    key: string;

    /**
     * > **This will be removed**
     * > A future version of the library will set this automatically when importing the different superpower modules.
     * 
     * The native extension libraries to load with the API.
     *
     * @type {GoogleMapsLibrary[]}
     */
    libraries?: GoogleMapsLibrary[];
    /**
     * By default, the Maps JavaScript API uses the user's preferred language setting
     * as specified in the browser, when displaying textual information such as the
     * names for controls, copyright notices, driving directions and labels on maps.
     * In most cases, it's preferable to respect the browser setting. However, if you
     * want the Maps JavaScript API to ignore the browser's language setting, you can
     * force it to display information in a particular language by setting this parameter.
     *
     * @See https://developers.google.com/maps/documentation/javascript/localization
     */
    language?: string;
    /**
     * When you load the Maps JavaScript API from maps.googleapis.com it applies
     * a default bias for application behavior towards the United States. If you want
     * to alter your application to serve different map tiles or bias the application
     * (such as biasing geocoding results towards the region), you can override this
     * default behavior by setting this parameter.
     *
     * @See https://developers.google.com/maps/documentation/javascript/localization
     */
    region?: string;
}

/**
 * The configuration for the async module.
 * 
 * Defined for scalability. Declared as a class (and not an interface) for injectability.
 */
export class GoogleMapsConfig
{
    /**
     * The full url pointing to Google's Maps API, including library imports, language and other relevant params.
     * 
     * When specifying a `GoogleApiUrl` object, the library will create the full url automatically.
     *
     * @type {(string | GoogleApiUrl)}
     */
    public apiUrl: string | GoogleApiUrl;
}
