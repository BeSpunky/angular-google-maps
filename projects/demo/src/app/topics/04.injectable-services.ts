import { Example } from '../types/example';
import { Topic   } from '../types/topic';

export const InjectableServicesExamples: Example[] = [
    {
        title      : 'GoogleMapsApiService',
        description: 'Access to low-level functionality and shortcut to the other services.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    },
    {
        title      : 'GoogleMapsComponentApiService',
        description: 'Easily connect Angular functionality with native objects.',
        notes      : 'This is mostly intended for extension of the library. See README.md for details.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    },
    {
        title      : 'GeometryTransformService',
        description: 'Transform geometry objects between types, calculate bounds and prepare your objects for interaction with the native API.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    },
    {
        title      : 'EventDataTransformService',
        description: 'Extract the gist out of native event data objects in a more comfortable format.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    }
];

export const InjectableServicesTopic: Topic = {
    title      : 'Injectable Services',
    description: 'Low-level tools, easy geometry transformations and other utilities.',
    icon       : 'miscellaneous_services',
    examples   : InjectableServicesExamples
};
