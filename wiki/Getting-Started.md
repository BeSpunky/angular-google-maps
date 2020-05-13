# Getting Started

## 1. Install the library
 
    > npm install @bespunky/angular-google-maps

## 2. Include the main module and start working

How are you planning on loading Google Maps API?
<br/>
<details>
<summary markdown="div">I'm gonna manually load it</summary>
<small>
In case you'll place a `script` tag manually, or you have your own loading mechanism, and you can ensure that it will be loaded before your map component gets loaded.
</small>

[Show me how](Getting-Started/Manually-Loading.md)
</details>
<br/>
<details>
<summary markdown="div">Take care of it for me please</summary>
<small>
The library will load it for you asyncronously when you import the main module and ensure that map components will be rendered safely after the API is ready.
</small>

[Show me how](Getting-Started/Auto-Async-Loading.md)
</details>