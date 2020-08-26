# Let's start with why...
I don't like working hard. I prefer working smart...

It was inevitable, once I realized wrapping the Google Maps Javascript library means repeating code and hard-coding function delegation, I would try and create a mechanism to automate the process.

[[_TOC_]]

# The Problem
There's more than one way to bring Angular functionality (i.e. two-way bindings, event handling, template interpolation, change detection...) to a native library. However you do it, most likely you will implement your own functions/routines to use native functionalities you would like to provide in your library.

So the big questions are:
* What happens when the native library adds/removes/modifies a feature?  
**I'll now have to do the same for my library.**

* What happens when I need to change the way I delegate calls to the native functions?  
**I would have to implement the change throughout my entire code base.**

* Am I willing to repeat myself and duplicate code?  
**Hell no.**

<br/>

# Solution
`@bespunky/angular-google-maps` implements different tools which play together nicely to automate the process of wrapping and delegation. Meet our friends:

## Wrappers
The main purpose of these is **transparently** delegating function calls to the native object, **without implementing anything on the wrapper itself**. In turn, this also allows for preprocessing and postprocessing.

### [Proxy](https://dev.azure.com/BeSpunky/libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Futils%2Fproxy-utils.ts&version=GBmaster&line=28&lineEnd=29&lineStartColumn=1&lineEndColumn=1&lineStyle=plain)
Every wrapper is by definition a [Javascript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object. It traps calls to functions on the wrapper, then if the wrapper doesn't have the function, delegates the call to the native object.

Wait, if the method doesn't exist on the wrapper, I won't have intellisense for it... 🤔  
TypeScript to the rescue... 🙌

### [Extension Interfaces](https://dev.azure.com/BeSpunky/libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fmodules%2Fmap%2Fgoogle-map.ts&version=GBmaster&line=16&lineEnd=17&lineStartColumn=1&lineEndColumn=1&lineStyle=plain)
In a nutshell, TypeScript allows creating an interface with the same name of a class. The result is every method signature in the interface appearing in the class's intellisense.

Oh bollocks... Do I now have to type all the signatures for the native functions manually?? 😨  
TypeScript to the rescue! Again... 🙌

### [Utility Types](https://dev.azure.com/BeSpunky/libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fabstraction%2Ftypes%2Futils.ts&version=GBmaster&_a=contents)
With TypeScript's utility types it is possible to extract a sub type with only function signatures. It took some juggling... but the end result is pretty cool.

Combine those three pieces together, and we have magic! ✨

## Components
Two things are at the base of most Angular components: `@Input` properties and `@Output` event emitters.
The library takes care of connecting properties and events to the wrapper object.

### [Component API](https://dev.azure.com/BeSpunky/libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fapi%2Fgoogle-maps-component-api.service.ts&version=GBmaster&line=19&lineEnd=20&lineStartColumn=1&lineEndColumn=1&lineStyle=plain)
Implemented as an injectable service, the component api is the core bridge between components and wrappers. It has two functions:
1. Create observables that, upon subscription, hook to wrapper events. Then assign them to the component's output properties.
2. Delegate changes from `ngOnChanges()` to the wrapper's setter functions.

### [Base Component](https://dev.azure.com/BeSpunky/libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Fcore%2Fabstraction%2Fbase%2Fgoogle-maps-component-base.ts&version=GBmaster&line=28&lineEnd=29&lineStartColumn=1&lineEndColumn=1&lineStyle=plain)
The base component is an abstract class which takes care of interaction with the component API.
You'll find that every component or directive in the library extends the base component.

# The Result
Clean code, easy to implement and support new types, scalability and zero-to-minimal effort required when the native library changes its implementation.

Creating a new component?
Extend the base component, then simply declare properties and events.

![image.png](/.attachments/image-bcd5dd1a-15b7-4e2b-8c84-13933b2b5350.png)

Creating a new wrapper?
Extend the wrapper class, add a decorator and an extension interface... You're good to go!

![image.png](/.attachments/image-46d14fb6-692c-4775-8718-db4878bae4b1.png)















