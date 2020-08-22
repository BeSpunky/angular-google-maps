import { Example } from '../types/example';
import { Topic   } from '../types/topic';

export const InjectableServicesExamples: Example[] = [
    {
        title      : 'GoogleMapsApiService',
        description: 'Access to low-level functionality and shortcut to the other services.',
        embedUrl   : '',
        soon       : true
    },
    {
        title      : 'GoogleMapsComponentApiService',
        description: 'Easily connect Angular functionality with native objects.',
        embedUrl   : '',
        soon       : true
    },
    {
        title      : 'GeometryTransformService',
        description: 'Transform geometry objects between types, calculate bounds and prepare your objects for interaction with the native API.',
        embedUrl   : '',
        soon       : true
    },
    {
        title      : 'EventDataTransformService',
        description: 'Extract the gist out of native event data objects in a more comfortable format.',
        embedUrl   : '',
        soon       : true
    }
];

export const InjectableServicesTopic: Topic = {
    title      : 'Injectable Services',
    description: 'Low-level tools, easy geometry transformations and other utilities.',
    icon       : 'miscellaneous_services',
    examples   : InjectableServicesExamples
};
