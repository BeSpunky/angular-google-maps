import { NativeDirectionsService } from '@bespunky/angular-google-maps/directions';

describe('NativeDirectionsService', () =>
{
    it('should be created as the native service', () => expect(new NativeDirectionsService()).toBeInstanceOf(google.maps.DirectionsService));
});