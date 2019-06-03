/*
 * Public API Surface of angular-google-maps
 */

// Modules
export * from './lib/google-maps.module';

// Providers
export * from './lib/api/google-maps-api.service';
export * from './lib/config/google-maps-config';
export * from './lib/loaders/google-maps-api-loader';
export * from './lib/loaders/lazy-google-maps-api-loader';
export * from './lib/loaders/no-op-google-maps-api-loader';

// Classes & Enums
export * from './lib/config/defaults';

// Map
export * from './lib/google-map/component/google-map.component';
export * from './lib/google-map/google-map';
export * from './lib/google-map/types/zoom-level.enum';
export * from './lib/google-map/types/map-event.enum';

// Markers
export * from './lib/google-map-marker/component/google-map-marker.component';
export * from './lib/google-map-marker/google-map-marker';
export * from './lib/google-map-marker/types/marker-event.enum';

