import { Example } from '../types/example';
import { Topic   } from '../types/topic';

export const DirectionsExamples: Example[] = [
    {
        title      : 'Directions Directive',
        description: 'Retrieve directions and render them on the map.',
        icon       : 'directions',
        embedUrl   : '', soon: true
    },
    {
        title      : 'Directions Service',
        description: 'Retrieve directions and create a live directions feed.',
        icon       : 'alt_route',
        embedUrl   : '', soon: true
    },
];

export const DirectionsTopic: Topic = {
    title      : 'Directions',
    description: 'Retrieve directions and render them on the map.',
    icon       : 'directions',
    examples   : DirectionsExamples
};
