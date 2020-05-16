# Context
You've probably seen the mysterious `*bsSafe` directive throughout the documentation. The directive simply prevents angular from rendering the map component until maps api has been loaded by the library.

`*bsSafe` is only needed when [loading maps api asynchronously](/Getting-Started/Auto-Async-Loading).

# What if I'm loading maps api manually...?
You'd have to come up with your own way of guaranteeing that the map api is loaded before the component is rendered.

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