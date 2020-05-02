import { MockGoogleMapWithOverlays, MockGoogleMapsData, MockGoogleMapsFeature } from '@bespunky/angular-google-maps/overlays/testing';
import { IGoogleMapsFeature } from '../feature/i-google-maps-feature';
import { FeatureTracker     } from './feature-tracker';

describe('FeatureTracker', () =>
{
    let tracker: FeatureTracker;
    
    beforeEach(() => tracker = new FeatureTracker());

    function addFeature(id?: string)
    {
        const nativeFeature = new google.maps.Data.Feature({ id, geometry: new google.maps.Data.Point({ lat: 20, lng: 20 }) });
        const feature = new MockGoogleMapsFeature(new MockGoogleMapsData(new MockGoogleMapWithOverlays()), nativeFeature);

        tracker.add(feature);

        return feature;
    }

    describe('basically', () =>
    {
        it('should create an instance', () => expect(tracker).toBeDefined());
        
        it('should determine if the tracker has features when reading `hasFeatures`', () =>
        {
            expect(tracker.hasFeatures).toBeFalsy();

            addFeature();

            expect(tracker.hasFeatures).toBeTruthy();

            tracker.remove(tracker.list[0]);

            expect(tracker.hasFeatures).toBeFalsy();
        });

        it('should determine if the tracker is empty when reading `isEmpty`', () =>
        {
            expect(tracker.isEmpty).toBeTruthy();

            addFeature();

            expect(tracker.isEmpty).toBeFalsy();

            tracker.remove(tracker.list[0]);

            expect(tracker.isEmpty).toBeTruthy();
        });
    });

    describe('calling `add()`', () =>
    {
        it('should add a feature', () =>
        {
            expect(tracker.isEmpty).toBeTruthy();

            const feature = addFeature();
        
            expect(tracker.list.length).toBe(1);
            expect(tracker.list[0]).toBe(feature);
        });
    });

    describe('calling `remove()`', () =>
    {
        let feature: IGoogleMapsFeature;
        
        beforeEach(() => feature = addFeature('paw!'));
        
        function testRemove(removeBy: () => any)
        {
            const removed = tracker.remove(removeBy());

            expect(removed).toBe(feature);
            expect(tracker.isEmpty).toBeTruthy();
        }

        it('should remove and return a feature by an id',             () => testRemove(() => tracker.list[0].getId()));

        it('should remove and return a feature by a native feature',  () => testRemove(() => feature.native));

        it('should remove and return a feature by a feature wrapper', () => testRemove(() => feature));
    
        it('should return null when a feature is not found',          () => expect(tracker.remove('non-existant')).toBeNull());
    });
});