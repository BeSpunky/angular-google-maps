import { GoogleMapsMarkerDirective } from './google-maps-marker.directive';

describe('GoogleMapsMarkerDirective', () =>
{
    it('should create an instance', () =>
    {
        const directive = new GoogleMapsMarkerDirective(null, null);
        expect(directive).toBeTruthy();
    });
});
