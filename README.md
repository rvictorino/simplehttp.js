# Simple HTTP request javascript library
I wanted to be able to do things like
```javascript
  new SimpleHttp()
    .onProgress(percent => console.log(`${percent}% data loaded`))
    .onSuccess(() => console.log("Yay success!"))
    .onStatus(404, () => console.log("Handling 404 code separately"))
    .onClientError(() => console.log("But other 4xx can be handled together"))
    .get("http://example.com/something")
```

This library is just a simple wrapper around a XMLHttpRequest. This code is not complete, and not meant for a use in production. It just helps me start quick projects from scratch when it comes to HTTP requests.
