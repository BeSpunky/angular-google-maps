# Let's start with "why"...
Creating an Angular library for a native library means you want to take advantage of the powers of Angular. Two-way binding, event handling, change detection, template interpolation... How would you bring those to the native library?

Manually wrapping all native types and their functionalities is a cumbersome task.

What happens when the native library adds/removes/modifies a function?  
**You now have to do the same for your library.**

What happens when you need to change the way you delegate calls to the native functions?  
**You would have to implement the change throughout your code base.**

# Solution
`@bespunky/angular-google-maps` implements different tools which play together nicely to automate the process of wrapping and delegation:

## Proxy
Every wrapper is by definition a [Javascript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object. The proxy detects calls to functions which don't exist on the wrapper and delegates them to the corresponding