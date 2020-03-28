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

export * from './lib/utils/transform/event-data-transform.service';

// Classes & Enums
export * from './lib/core/config/defaults';
export * from './lib/core/abstraction/events/google-maps-event-data';

// Map
export * from './lib/google-map/google-map';
export * from './lib/google-map/component/google-map.component';
export * from './lib/google-map/types/zoom-level.enum';
export * from './lib/google-map/component/map-event.enum';

// Markers
export * from './lib/overlays/marker/google-maps-marker';
export * from './lib/overlays/marker/directive/google-maps-marker.directive';
export * from './lib/overlays/marker/directive/marker-event.enum';

// Data Layer
export * from './lib/overlays/data/google-maps-data';
export * from './lib/overlays/data/directive/google-maps-data.directive';
export * from './lib/overlays/data/directive/data-event.enum';

