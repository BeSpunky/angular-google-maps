# Superpowers
As the library is tree-shake ready, map capabilities are loaded dynamically, depending on the modules the using app imports.
For example, if `GoogleMapsOverlaysModule` is imported, the overlays capabilities should be added to the map.

To allow map capabilities to be extended in runtime, the superpowers concept was introduced.
Extending modules will provide a new superpower (capability) to the map component using the `Superpowers` token.

Any superpower provider should be declared `{ multi: true }` to allow the component to receive an array of capabilities loaded by the different module imports.

