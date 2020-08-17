import { Example } from '../types/example';
import { Topic   } from '../types/topic';

export const TheMapExamples: Example[] = [
    {
        title      : 'Map Options',
        description: 'Set options to your map (e.g. center, zoom, etc.)',
        icon       : 'tune',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-map-options?embed=1&file=src/app/map/map.component.html'
    },
    {
        title      : 'Map Events',
        description: 'Bind event handlers and react to user interactions with the map.',
        icon       : 'flash_on',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-map-events?embed=1&file=src/app/map/map.component.html'
    },
    {
        title      : 'Map Wrapper',
        description: 'Get to know the map object and unlock the full potential of your map.',
        icon       : 'widgets',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    }
];

export const TheMapTopic: Topic = {
    title      : 'The Map',
    description: 'Map configuration, event handling and advanced control.',
    icon       : 'map',
    examples   : TheMapExamples
};
