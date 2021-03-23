## 1. Install the library
 
    npm install @bespunky/angular-google-maps

## 2. Include the main module and start working

How are you planning on loading Google Maps API?
<br/>
<details>
<summary markdown="span">Take care of it for me please</summary><br/>
<small>
The library will load it for you asynchronously when you import the main module and ensure that map components will be rendered safely after the API is ready.
</small>
<br/><br/>

[Show me how](/docs/additional-documentation/getting-started/plug-n-play-async-loading.html)
</details>

<br/>
<details>
<summary markdown="span">I have my own async loading strategy</summary><br/>
<small>
In case you need to create a custom loader and integrate it with the library. The library will run your loader and ensure that map components will be rendered safely after the API is ready.
</small>
<br/><br/>

[Show me how](/docs/additional-documentation/getting-started/custom-loader.html)
</details>
<br/>
<details>
<summary markdown="span">I'm gonna manually load it</summary><br/>
<small>
In case you'll place a `script` tag manually and you can ensure that it will be loaded before your map component gets loaded.
</small>
<br/><br/>

[Show me how](/docs/additional-documentation/getting-started/manually-loading.html)
</details>

<br/>

## 🔑 You'll need an API key from Google ([Get it here](https://developers.google.com/maps/documentation/javascript/get-api-key))
You don't have to do so right now, but you'll need it later.  

Google actually allows you to use their maps api in development mode without an api key, but it will stick an annoying overlay with a dialog each time your map loads.

When you're ready for production, or simply want to work without interruptions, get your key and incorporate it into your app.