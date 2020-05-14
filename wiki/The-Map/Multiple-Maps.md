Each time you add a map component to your view, a new map instance is created. Every component or directive placed inside of the map component will interact with, and only with, its parent map component.

This allows you to safely put multiple map components in your app, even in the same view.

