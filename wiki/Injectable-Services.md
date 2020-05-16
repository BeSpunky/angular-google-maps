# Buildup
I ❤ Google Maps. It's awesome! But if you've worked with Google Maps API before, you know... Everything is so damn complicated! 😪 Type conversions, manually calculating geometries, recursively building a bounds object, keeping track of your objects...  🤦‍♂️ 

Apart from components and directives, the library gives you access to powerful tools to do all the heavy-lifting 🏋️‍♂️ for you:

# GoogleMapsApiService
Wrappers use this service internally, but you can use it too. Gives you access to underlying low-level operations, and saves you the need of injecting any of the other services into your components.

# GeometryTransformService
Provides methods to construct, deconstruct and transform geometry data.

Inject it directly or fetch it through the `geometry` property of `GoogleMapsApiService`.

# EventDataTransformService
The event data constructed by the native api has always been confusing and annoying to me. This service knows the different types of event data objects raised by the native api and provides transformation methods for easy extraction of useful information.

Inject it directly or fetch it through the `eventsData` property of `GoogleMapsApiService`.

> Though it is exported and injectable, you probably would never need to use this service directly as event data transformation happens automatically internally before your handlers are fired. See `args` property in the event data.