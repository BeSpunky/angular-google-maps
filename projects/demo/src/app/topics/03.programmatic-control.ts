import { Example } from '../types/example';
import { Topic   } from '../types/topic';

export const ProgrammaticControlExamples: Example[] = [
    {
        title      : 'Wrappers From Events',
        description: 'Relying on events to work with wrappers.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    },
    {
        title      : 'Wrappers From `ViewChild`',
        description: 'Querying the view inside of your component to fetch the wrapper instance.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    },
    {
        title      : 'Wrappers Directly In Template',
        description: 'Creating reference variables and using your wrappers directly in your template.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    },
    {
        title      : 'Custom Data',
        description: 'Store custom data along with your different wrapper instances for your needs.',
        embedUrl   : 'https://stackblitz.com/edit/bs-google-maps-simple?embed=1&file=src/app/app.module.ts&theme=dark'
    }
];

export const ProgrammaticControlTopic: Topic = {
    title      : 'Programmatic Control',
    description: 'Different ways of accessing wrappers and storing custom data.',
    icon       : 'code',
    examples   : ProgrammaticControlExamples
};
