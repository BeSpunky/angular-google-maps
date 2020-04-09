// import { configureGoogleMapsTestingModule } from '../testing/setup.spec';
// import { OverlaysTracker } from "./overlays-tracker";
// import { IGoogleMap } from '../google-map/i-google-map';
// import { IGoogleMapsMarker } from './marker/i-google-maps-marker';
// import { OverlayType } from '../core/abstraction/base/overlay-type.enum';
// import { DrawableOverlay } from '../core/abstraction/types/drawable-overlay.type';

// describe('OverlayTracker', () =>
// {
//     let overlays = new OverlaysTracker();

//     beforeEach(() => configureGoogleMapsTestingModule());

//     it('should create an instance', () => expect(overlays).toBeDefined());

//     it('should add an overlay when calling the `add()` method', () =>
//     {
//         expect(overlays.markers.length).toBe(0);
        
//         const marker = new StubGoogleMapsMarker(OverlayType.Marker);
        
//         overlays.add(marker);

//         expect(overlays.markers.length).toBe(1);
//         expect(overlays.markers[0]).toBe(marker);
//     });

//     it('should remove an overlay when calling the `remove()` method', () =>
//     {
//         // As OverlayTracker is instantiated once globaly, there should be a marker from the previous test
//         expect(overlays.markers.length).toBe(1);
  
//         overlays.remove(overlays.markers[0]);

//         expect(overlays.markers.length).toBe(0);
//     });

//     it('should throw an error if the overlay type is not supported', () =>
//     {
//         // Define a type that doesn't exist
//         const dummyOverlay = { type:  -1000 };

//         expect(() => overlays.add(dummyOverlay as DrawableOverlay)).toThrowError(/supported/);
//     });
// });

// class StubGoogleMapsMarker implements IGoogleMapsMarker
// {
//     public map: IGoogleMap;
//     public native: any;
//     public custom: any;

//     constructor(public type: OverlayType) { }
    
//     setOptions(options: google.maps.MarkerOptions): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getAnimation(): google.maps.Animation
//     {
//         throw new Error("Method not implemented.");
//     }
//     setAnimation(animation?: google.maps.Animation): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getClickable(): boolean
//     {
//         throw new Error("Method not implemented.");
//     }
//     setClickable(clickable: boolean): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getCursor(): string
//     {
//         throw new Error("Method not implemented.");
//     }
//     setCursor(cursor: string): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getDraggable(): boolean
//     {
//         throw new Error("Method not implemented.");
//     }
//     setDraggable(draggable: boolean): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getIcon(): string | google.maps.Icon | google.maps.Symbol
//     {
//         throw new Error("Method not implemented.");
//     }
//     setIcon(icon: string | google.maps.Icon | google.maps.Symbol): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getLabel(): google.maps.MarkerLabel
//     {
//         throw new Error("Method not implemented.");
//     }
//     setLabel(label: string | google.maps.MarkerLabel): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getOpacity(): number
//     {
//         throw new Error("Method not implemented.");
//     }
//     setOpacity(opacity: number): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getPosition(): google.maps.LatLng
//     {
//         throw new Error("Method not implemented.");
//     }
//     setPosition(position: google.maps.LatLng | google.maps.LatLngLiteral): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getShape(): google.maps.MarkerShape
//     {
//         throw new Error("Method not implemented.");
//     }
//     setShape(shape: google.maps.MarkerShape): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getTitle(): string
//     {
//         throw new Error("Method not implemented.");
//     }
//     setTitle(title: string): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getVisible(): boolean
//     {
//         throw new Error("Method not implemented.");
//     }
//     setVisible(visible: boolean): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     getZIndex(): number
//     {
//         throw new Error("Method not implemented.");
//     }
//     setZIndex(zIndex: number): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     attach(map: IGoogleMap): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     detach(): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     listenTo(eventName: string, handler: (...args: any[]) => void): () => void
//     {
//         throw new Error("Method not implemented.");
//     }
//     stopListeningTo(eventName: string): void
//     {
//         throw new Error("Method not implemented.");
//     }
//     clearListeners(): void
//     {
//         throw new Error("Method not implemented.");
//     }
// }