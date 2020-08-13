# Let's start with "why"...
I don't like working hard. I prefer working smart...

It was inevitable, once I realized wrapping the Google Maps Javascript library means repeating code and hard-coding function delegation, I would try and create a mechanism to automate the process.

[[_TOC_]]

# The Problem
There's more than one way to bring Angular functionality (i.e. two-way bindings, event handling, template interpolation, change detection...) to a native library. However you do it, most likely you will implement your own functions/routines to use native functionalities you would like to provide in your library.

> You can read about it more in details in [my blog post](https://ThoughtsOfARandomPerson.com/posts/how-i-wrapped-google-maps-api).

So the big questions are:
* What happens when the native library adds/removes/modifies a feature?  
**I'll now have to do the same for my library.**

* What happens when I need to change the way I delegate calls to the native functions?  
**I would have to implement the change throughout my entire code base.**

* Am I willing to repeat myself and duplicate code?  
**Hell no.**

# Solution
`@bespunky/angular-google-maps` implements different tools which play together nicely to automate the process of wrapping and delegation. I'll explain in a nutshell how they play together, but will leave links to parts from the source code just in case you're curious.

## Wrappers
The main purpose of these is **transparently** delegating function calls to the native object, **without implementing anything on the wrapper itself**. In turn, this also allows for preprocessing and postprocessing.

### [Proxy](https://dev.azure.com/BeSpunky/libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Futils%2Fproxy-utils.ts&version=GBdevelopment&line=28&lineEnd=29&lineStartColumn=1&lineEndColumn=1&lineStyle=plain)
Every wrapper is by definition a [Javascript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object. It traps calls to functions on the wrapper, then if the wrapper doesn't have the function, delegates the call to the native object.

Wait, if the method doesn't exist on the wrapper, I won't have intellisense for it... 🤔  
TypeScript to the rescue... 🙌

### [Extension Interfaces](https://dev.azure.com/BeSpunky/libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fmodules%2Fmap%2Fgoogle-map.ts&version=GBdevelopment&line=16&lineEnd=17&lineStartColumn=1&lineEndColumn=1&lineStyle=plain)
In a nutshell, TypeScript allows creating an interface with the same name of a class. The result is every method signature in the interface appearing in the class' intellisense.

Oh bollocks... Do I now have to type all the signatures for the native functions manually?? 😨  
TypeScript to the rescue! Again... 🙌

### [Utility Types](https://dev.azure.com/BeSpunky/libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fabstraction%2Ftypes%2Futils.ts&version=GBdevelopment&line=1&lineEnd=2&lineStartColumn=1&lineEndColumn=1&lineStyle=plain)
With TypeScript's utility types it is possible to extract a sub type with only function signatures. It took some juggling... but the end result is pretty cool.

Combine those three pieces together, and we have magic! ✨

## Components
Two things are at the base of most Angular components: `@Input` properties and `@Output` event emitters.
The library takes care of connecting properties and events to the wrapper object.

### [Component API](https://dev.azure.com/BeSpunky/libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fapi%2Fgoogle-maps-component-api.service.ts&version=GBdevelopment&line=19&lineEnd=20&lineStartColumn=1&lineEndColumn=1&lineStyle=plain)
Implemented as an injectable service, the component api is the core bridge between components and wrappers. It has two functions:
1. Create observables that, upon subscription, hook to wrapper events. Then assign them to the component's output properties.
2. Delegate changes from `ngOnChanges()` to the wrapper's setter functions.

























