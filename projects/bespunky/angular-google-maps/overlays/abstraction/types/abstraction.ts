import { IGoogleMapsDrawableOverlay       } from '../base/i-google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';

export type DrawableOverlay = IGoogleMapsDrawableOverlay<IGoogleMapsNativeDrawableOverlay>;
