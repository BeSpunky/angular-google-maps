export const DefaultApiUrlFormat = '{protocol}://{location}?key={key}{settings}';
export const DefaultApiLocation = 'maps.googleapis.com/maps/api/js';

export enum HttpProtocol
{
    Http  = 'http',
    Https = 'https'
}

/** https://developers.google.com/maps/documentation/javascript/libraries */
export enum GoogleMapsLibrary
{
    Drawing         = 'drawing',
    Geometry        = 'geometry',
    Places          = 'places',
    Visualization   = 'visualization'
}

export class GoogleApiUrl
{
    public protocol?: HttpProtocol;

    public location?: string;

    public key: string;

    public libraries?: GoogleMapsLibrary[]; // TODO: Remove as option and read from a token { multi: true } provided by the different modules
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
    public language?: string;
    /**
     * When you load the Maps JavaScript API from maps.googleapis.com it applies
     * a default bias for application behavior towards the United States. If you want
     * to alter your application to serve different map tiles or bias the application
     * (such as biasing geocoding results towards the region), you can override this
     * default behavior by setting this parameter.
     *
     * @See https://developers.google.com/maps/documentation/javascript/localization
     */
    public region?: string;
}

export class GoogleMapsConfig
{
    public apiUrl: string | GoogleApiUrl;

    // NOT IMPLEMENTED YET
    public recycleMapObject?: boolean;
}
