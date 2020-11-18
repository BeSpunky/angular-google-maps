# Buildup
I ❤ Google Maps. It's awesome! But if you've worked with Google Maps API before, you know... Everything is so damn complicated! Type conversions, manually calculating geometries, keeping track of your objects... 😪

I mean, come on... Do I really need to extract all coords from my polygons and markers, then calculate and create a bounds object myself?? Why can't I just pass my overlay objects to `fitBounds()` and let it do the work for me?? 🤦‍♂️ 

Well, with `@bespunky/angular-google-maps`... you can!  
Apart from components and directives, the library gives you access to powerful tools to do all the heavy-lifting for you. 🏋️‍♂️

# [GoogleMapsApiService](/docs/injectables/GoogleMapsApiService.html)
Wrappers use this service internally, but you can use it too. Gives you access to underlying low-level operations, and saves you the need of injecting any of the other services into your components.

**Injection 💉:** directly.

# [GoogleMapsComponentApiService](/docs/injectables/GoogleMapsComponentApiService.html)
This is the bridge between components and wrappers. It handles event hooking and property change delegation. It is a core part of the library's [infrastructure](/docs/additional-documentation/internal-workings.html). Use it if you're creating your own components.

**Injection 💉:** directly.

# [GeometryTransformService](/docs/injectables/GeometryTransformService.html)
Provides methods to construct, deconstruct and transform geometry data.

**Injection 💉:** directly or through the `geometry` property of `GoogleMapsApiService`.

# [EventDataTransformService](/docs/injectables/EventDataTransformService.html)
The event data constructed by the native api has always been confusing and annoying to me. This service knows the different types of event data objects raised by the native api and provides transformation methods for easy extraction of useful information.

**Injection 💉:** directly or through the `eventsData` property of `GoogleMapsApiService`.

> Though it is exported and injectable, you probably would never need to use this service directly as event data transformation happens automatically internally before your handlers are fired. See `args` property in the event data.