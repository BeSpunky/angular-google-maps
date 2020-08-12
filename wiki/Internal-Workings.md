# Let's start with "why"...
I don't like working hard. I prefer working smart...

It was inevitable, once I realized wrapping the Google Maps Javascript library means repeating code and hard-coding function delegation, I would try and create a mechanism to automate the process.

[[_TOC_]]

# The Problem
There's more than one way to bring Angular functionality (i.e. two-way bindings, event handling, template interpolation, change detection...) to a native library. However you do it, most likely you will implement your own functions/routines to use native functionalities you would like to provide in your library.

> You can read about it more in details in [my blog post](https://ThoughtsOfARandomPerson/posts/how-i-wrapped-google-maps-api)

So the big questions are:
* What happens when the native library adds/removes/modifies a feature?  
**I'll now have to do the same for my library.**

* What happens when I need to change the way I delegate calls to the native functions?  
**I would have to implement the change throughout my entire code base.**

* Am I willing to repeat myself and duplicate code?  
**Hell no.**

## Events
So you created 20 `EventEmitter` objects in your component. How do you connect them to the native event? Maybe you go through the events one by one, call the native `addListener` function, then in the handler you call the `emit()` method on the appropriate emitter...

Do you blindly register handlers for every event, even if the component's user didn't 
require it?

## Functions
Theoretically, our map component could simply instantiate and expose a native map object. But what's the fun in that? 😉
More importantly, once the user got his hands on the native object, what control do we have over execution? Non.

🥁 Here comes the wrapper... We create a class to wrap the native map, and for each function we need from the native object we create a wrapper method to delegate the call. Now we are in control.

T
# Solution
`@bespunky/angular-google-maps` implements different tools which play together nicely to automate the process of wrapping and delegation:

## Proxy
Every wrapper is by definition a [Javascript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object. The proxy detects calls to functions which don't exist on the wrapper and delegates them to the corresponding