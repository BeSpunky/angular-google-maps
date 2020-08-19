import { Example } from '../types/example';
import { Topic   } from '../types/topic';

export const GeometryTypesExamples: Example[] = [
    {
        title      : 'Single Coord',
        description: 'Format flexiblity with single coordinates.',
        icon       : 'gps_fixed',
        embedUrl   : '',
        soon       : true
    },
    {
        title      : 'Single Paths',
        description: 'Format flexibility with single paths.',
        icon       : 'timeline',
        embedUrl   : '',
        soon       : true
    },
    {
        title      : 'Multi Paths',
        description: 'Format flexibility with multi paths.',
        icon       : 'tonality',
        embedUrl   : '',
        soon       : true
    }
];

export const GeometryTypesTopic: Topic = {
    title      : 'Geometry Types',
    description: 'The different formats and types supported by the library for working with geometry.',
    icon       : 'architecture',
    examples   : GeometryTypesExamples
};
