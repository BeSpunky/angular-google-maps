# Let's start with "why"...
I don't like working hard. I prefer working smart...

It was inevitable, once I realized wrapping the Google Maps Javascript library means repeating code and hard-coding function delegation, I would try and create a mechanism to automate the process.

[[_TOC_]]

# The Problem
There's more than one way to bring Angular functionality (i.e. two-way bindings, event handling, template interpolation, change detection...) to a native library. However you do it, most likely you will implement your own functions/routines to use native functionalities you would like to provide in your library.

> You can read about it more in details in [my blog post](https://ThoughtsOfARandomPerson.com/posts/how-i-wrapped-google-maps-api)

So the big questions are:
* What happens when the native library adds/removes/modifies a feature?  
**I'll now have to do the same for my library.**

* What happens when I need to change the way I delegate calls to the native functions?  
**I would have to implement the change throughout my entire code base.**

* Am I willing to repeat myself and duplicate code?  
**Hell no.**

# Solution
`@bespunky/angular-google-maps` implements different tools which play together nicely to automate the process of wrapping and delegation:

## Proxy
Every wrapper is by definition a [Javascript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object. The proxy detects calls to functions which don't exist on the wrapper and delegates them to the corresponding