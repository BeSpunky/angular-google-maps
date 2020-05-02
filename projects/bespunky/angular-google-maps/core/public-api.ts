// Module
export * from './google-maps.module';

// Abstraction
export * from './abstraction/base/i-google-maps-native-object-wrapper';
export * from './abstraction/base/i-google-maps-native-object-emitting-wrapper';
export * from './abstraction/base/google-maps-native-object-wrapper';
export * from './abstraction/base/google-maps-native-object-emitting-wrapper';
export * from './abstraction/base/google-maps-lifecycle-base';

export * from './abstraction/events/i-google-maps-event-data';
export * from './abstraction/events/i-google-maps-mouse-event';
export * from './abstraction/events/google-maps-event-data';

export * from './abstraction/native/i-google-maps-native-object';

export * from './abstraction/tokens/wrapper-factory.token';

export * from './abstraction/types/abstraction';
export * from './abstraction/types/geometry.type';

// Api
export * from './api/google-maps-api.service';
export * from './api/google-maps-component-api.service';
export * from './api/transform/event-data-transform.service';
export * from './api/transform/geometry-transform.service';

export * from './api/loader/no-op-google-maps-api-loader';

// Expose the internal base class so users could inherit and replace the provider
export { GoogleMapsApiLoader } from '@bespunky/angular-google-maps/_internal';

// Decorators
export * from './decorators/native-object-wrapper.decorator';
export { Wrap           } from './decorators/wrap.decorator';
export { OutsideAngular } from './decorators/outside-angular.decorator';
export { Hook           } from './decorators/hook.decorator';

// Map
export * from './modules/map/google-map.module';
export * from './modules/map/i-google-map';
export * from './modules/map/google-map';
export * from './modules/map/google-map-factory.provider';
export * from './modules/map/component/google-map.component';
export * from './modules/map/types/zoom-level.enum';
export * from './modules/map/types/defaults';