import { IGoogleMapsDrawableOverlay       } from '../base/i-google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';

/** Represents the functionality that an overlay wrapper should provide. Alias for `IGoogleMapsDrawableOverlay<IGoogleMapsNativeDrawableOverlay>`. */
export type DrawableOverlay = IGoogleMapsDrawableOverlay<IGoogleMapsNativeDrawableOverlay>;
