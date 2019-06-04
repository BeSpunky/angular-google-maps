import { GoogleMapMarkerDirective } from './google-map-marker.directive';

describe('GoogleMapMarkerDirective', () =>
{
    it('should create an instance', () =>
    {
        const directive = new GoogleMapMarkerDirective(null, null);
        expect(directive).toBeTruthy();
    });
});
