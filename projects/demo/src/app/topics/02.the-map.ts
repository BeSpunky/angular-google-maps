import { Example } from '../types/example';
import { Topic   } from '../types/topic';

export const TheMapExamples: Example[] = [
    {
        title      : 'Map Events',
        description: 'Bind event handlers and react to user interactions with the map.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    },
    {
        title      : 'Map Options',
        description: 'Set options to your map (e.g. center, zoom, etc.)',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    },
    {
        title      : 'Map Wrapper',
        description: 'Get to know the map object and unlock the full potential of your map.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    }
];

export const TheMapTopic: Topic = {
    title      : 'The Map',
    description: 'Map configuration, event handling and advanced control.',
    icon       : 'map',
    examples   : TheMapExamples
};
