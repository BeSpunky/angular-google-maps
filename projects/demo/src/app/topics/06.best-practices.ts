import { Example } from '../types/example';
import { Topic   } from '../types/topic';

export const BestPracticesExamples: Example[] = [
    {
        title      : 'Feature Maps',
        description: 'Map scalability through a map component.',
        icon       : 'map',
        embedUrl   : '',
        soon       : true
    },
    {
        title      : 'Feature Components',
        description: 'Compose shared map features as a component or directive for as a child to the map.',
        icon       : 'widgets',
        embedUrl   : '',
        soon       : true
    }
];

export const BestPracticesTopic: Topic = {
    title      : 'Best Practices',
    description: 'Patterns for scalability, order and ease of use with maps.',
    icon       : 'military_tech',
    examples   : BestPracticesExamples
};
