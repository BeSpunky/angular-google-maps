# Listening to Events
Native events are exposed through the components and directives the angular way.
Refer to the component you're using for a list of raised events.

> Component `@Output` property names are always a camelCase representation of the native event name. So `bounds_changed` is hooked to `boundsChanged`, `rightclick` is hooked to `rightClick`, and so forth...

# Events Data
Events raised by the library always provide an events data object, even if the native event doesn't. The data object will always be a [`GoogleMapsEventData`](API/GoogleMapsEventsData.md) object (or an extending type) which, in addition to the native event data, contains other useful information like:
* The emitting wrapper
* The native object
* A simplified transformed version of the native event args.

 All at hand, so you don't have to transform anything yourself.

## Example
```html
<!-- Component template -->
<bs-google-map *bsSafe (mouseMove)="onMapMouseMove($event)"></bs-google-map>
```

```typescript
// Component class
import { GoogleMapsEventData } from '@bespunky/angular-google-maps/core';

@Component({...})
export YourComponent
{
    public onMapMouseMove(event: GoogleMapsEventData)
    {
        // Act on event data
    }
}
```

# See Also
| Topic | Description |
|-------|-------------|
|[`GoogleMapsEventData`](API/GoogleMapsEventsData.md)| The data emitted with events