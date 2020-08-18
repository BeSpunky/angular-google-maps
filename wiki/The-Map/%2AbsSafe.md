# Context
You've probably seen the mysterious `*bsSafe` directive throughout the documentation. The directive simply prevents angular from rendering the map component until maps api has been loaded by the library.

`*bsSafe` is only needed if the native maps api is loaded async, either by using the [plug-n-play setup](/Getting-Started/Plug-n-Play-Async-Loading), or the [custom loader setup](/wiki/Getting-Started/Custom-Loader).

[Manual loading setup] doesn't require, and will fail with, `*bsSafe` as the `async` module isn't even imported.

# What happens when I implement my own loading strategy...?
When you define a custom provider for `GoogleMapsApiLoader`, you automatically interact with `*bsSafe` behind the scenes. Just make sure you return a valid promise that resolves when the api is loaded and you're...... safe! 🙌

# Where should I use it?
The whole idea of `*bsSafe` is to provide safe access to the native `google` namespace. Obviously, the library uses the native namespace internally, so the `<bs-google-map>` component should, by definition, be marked with the directive.

That being said, if you're components directly use elements like `google.maps.Animation`, `google.maps.MapTypeId`, they should be marked with the directive. 

> **👍 The rule of thumb:** The top most component which refers to `google` should have the `*bsSafe` directive.

# What's the point anyways?
Most components, wrappers and other tools in the library rely on the native api to be loaded.
Instead of passing a promise or an observable all throughout the code base, `*bsSafe` takes care of waiting, once, for the native api, then renders the components. This allows code to be architectured and operated under the assumption that it has everything it needs.

In essence, something like this:
```typescript
public native: Promise<google.maps.Map>;

public async setCenter(center: ...): Promise<void>
{
    const map = await this.native;

    map.setCenter(center);
}
```

Reduces to this:
```typescript
public native: google.maps.Map;

public setCenter(center: ...): void
{
    this.native.setCenter(center);
}
```

Imagine the pain if every method in the library had to check for the api ready promise... right? 😉