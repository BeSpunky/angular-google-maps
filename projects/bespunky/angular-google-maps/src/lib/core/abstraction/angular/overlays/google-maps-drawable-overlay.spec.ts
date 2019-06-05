import { GoogleMapsDrawableOverlay } from './google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../../native/overlays/i-google-maps-native-drawable-overlay';
import { GoogleMap } from '../../../../google-map/google-map';

class DrawableOverlayMock extends GoogleMapsDrawableOverlay
{
    constructor(protected map: GoogleMap, private nativeOverlaySpy: jasmine.SpyObj<IGoogleMapsNativeDrawableOverlay>)
    {
        super(map);
    }

    get native(): Promise<IGoogleMapsNativeDrawableOverlay>
    {
        return new Promise<IGoogleMapsNativeDrawableOverlay>((resolve, reject) =>
        {
            resolve(this.nativeOverlaySpy);
        });
    }
}

describe('GoogleMapsDrawableOverlay (abstract)', () =>
{
    // let nativeOverlaySpy: jasmine.SpyObj<IGoogleMapsNativeDrawableOverlay>;
    // let overlayMock: DrawableOverlayMock;
    // let mapWrapperStub: GoogleMap;

    // beforeEach(() =>
    // {
    //     nativeOverlaySpy = jasmine.createSpyObj('nativeMap', ['setMap']);
    //     mapWrapperStub = new GoogleMap(null, null);

    //     overlayMock = new DrawableOverlayMock(mapWrapperStub, nativeOverlaySpy);

    //     spyOn(overlayMock, 'addToMap');
    // });

    // it('should be created', () => expect(overlayMock).toBeTruthy());

    // it('should add the overlay to the map that was passed-in to its constructor', () =>
    // {
    //     expect(overlayMock.addToMap).toHaveBeenCalledTimes(1);
    // });

    // it('should ')
});
