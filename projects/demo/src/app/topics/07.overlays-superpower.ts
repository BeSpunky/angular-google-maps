import { Example } from '../types/example';
import { Topic   } from '../types/topic';

export const OverlaysSuperpowerExamples: Example[] = [
    {
        title      : 'Markers',
        description: 'Add markers (pins) to the map.',
        icon       : 'location_on',
        embedUrl   : '',
        soon       : true
    },
    {
        title      : 'Polygons',
        description: 'Draw polygons on the map.',
        icon       : 'change_history',
        embedUrl   : '',
        soon       : true
    },
    {
        title      : 'Data Layer',
        description: 'Load different overlays straight from a GeoJson object, or manually add features.',
        icon       : 'category',
        embedUrl   : '',
        soon       : true
    },
    {
        title      : 'Overlay Tracking',
        description: 'Use the superpower\'s tracker to get a hold of all overlays you have placed on the map.',
        icon       : 'track_changes',
        embedUrl   : '',
        soon       : true
    }
];

export const OverlaysSuperpowerTopic: Topic = {
    title      : 'Overlays Superpower',
    description: 'Add markers, polygons and other overlays to your map, along with overlay tracking.',
    icon       : 'layers',
    examples   : OverlaysSuperpowerExamples
};
