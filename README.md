# true-json-promise
`> npm i true-json-promise`

There are a lot of JSON-Promise libraries out there. This is the code most of them use:
```js
module.exports = {
    stringify: function stringify(object) {
        return new Promise(resolve -> { resolve(JSON.stringify(object)) });
    },
    parse: function parse(s) {
        return new Promise(resolve -> { resolve(JSON.parse(s)) });
    }
};
```

I think it's obvious that this doesn't help in any way and is just spamming the npm registry.
However, this library actually addresses the problem of JSON's blocking nature and makes it asynchronous.
This is done by re-writing part of the JSON stringifier to use setImmediate instead of while or for. 
By doing this, for each item that's serialized the event loop executes once, causing other code to be able
to run at the same time.

### A javascript library that aims to make JSON.stringify not block the event loop.


## Gallery of shame
![image](https://user-images.githubusercontent.com/48156391/168308154-0733d608-be0a-4781-a0e8-d71a528a8562.png)
![image](https://user-images.githubusercontent.com/48156391/168308337-6a4c6524-4333-431f-93ff-4c5649e6878a.png)
