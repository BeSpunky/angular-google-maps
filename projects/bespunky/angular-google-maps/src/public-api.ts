/*
 * Public API Surface of angular-google-maps
 */

// Modules
export * from './lib/google-maps.module';

// Providers
export * from './lib/core/api/google-maps-api.service';
export * from './lib/core/config/google-maps-config';
export * from './lib/core/loaders/google-maps-api-loader';
export * from './lib/core/loaders/lazy-google-maps-api-loader';
export * from './lib/core/loaders/no-op-google-maps-api-loader';

// Classes & Enums
export * from './lib/core/config/defaults';

// Map
export * from './lib/google-map/component/google-map.component';
export * from './lib/google-map/google-map';
export * from './lib/google-map/types/zoom-level.enum';
export * from './lib/google-map/types/map-event.enum';

// Markers
export * from './lib/google-map/overlays/marker/directive/google-maps-marker.directive';
export * from './lib/google-map/overlays/marker/google-maps-marker';
export * from './lib/google-map/overlays/marker/types/marker-event.enum';

