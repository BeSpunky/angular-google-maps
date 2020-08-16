import { Example } from '../types/example';
import { Topic   } from '../types/topic';

export const GettingStartedExamples: Example[] = [
    {
        title      : 'Plug & Play (Simple Map)',
        description: 'Have the library import Google Maps API for you and add a simple map.',
        notes      : 'You\'ll need to have you\'r own key to Google Maps API. See README.md for more info.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    },
    {
        title      : 'Manual Loading',
        description: 'Implement your own mechanism for loading Google Maps API.',
        notes      : 'You\'ll need to have you\'r own key to Google Maps API. See README.md for more info.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    }
];

export const GettingStartedTopic: Topic = {
    title      : 'Getting Started',
    description: 'See how simple maps are integrated into an Angular app.',
    icon       : 'explore',
    examples   : GettingStartedExamples
};
