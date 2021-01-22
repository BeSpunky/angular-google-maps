# **v0.19.1** <small>2021-01-23</small>
📦 Updated Angular to v11.

➕ Added polylines support.

📃 Fixed minor documentation issues.

# **v0.18.0** <small>2020-10-11</small>
📦 Updated peer dependency [@bespunky/angular-zen](https://bs-angular-zen.web.app/) to v3.0.0.

⚡ Optimized imports from [@bespunky/angular-zen](https://bs-angular-zen.web.app/).

➖ Removed the `HttpProtocol` enum. Using union types instead.

♻ Changed `GoogleApiUrl` class to an interface.

♻ Simplified the `SuperpowersService` class using [Destroyable](https://bs-angular-zen.web.app/docs/zen/additional-documentation/coremodule/destroyable-(abstract).html)

🚢 Migrated source code to GitHub.

🚢 Moved official site to [https://bs-angular-g-maps.web.app](https://bs-angular-g-maps.web.app/)

📃 Added automated documentation and api reference using compodoc.

📃 Improved documentation coverage.

📃 Added contribution guidelines and code of conduct docs.

🔧 Updated links official site and readmes.

# **v0.17.0** <small>2020-10-11</small>
➕ Added a changelog file.

➕ Implemented circles.

➕ Added `GeometryTransformService.centerOf()` method for `BoundsLike` elements.

♻ Changed implementation of marker position from `Coord` to `BoundsLike` to support more geometries.

# **v0.16.0** <small>2020-08-29</small>
➕ Implemented info windows.