# Promises, Promises Everywhere

A utility library that is all about JavaScript Promises!

## About

I am always fascinated with things you can manipulate by using Promises. However, I was repeating my Promise conventions in every project or even multiple modules within the same project. Therefore, I decided that I should just write it once and use it as a library across all my projects.

## Special Thanks

The people who are responsible for TSDX. A great utility to help you bootstrap a new npm library with TypeScript, Rollup and Jest testing framework. See [TSDX on Github](https://github.com/formium/tsdx/)

## Utilities

### fakePromise

A method that mimics an async function behavior. It takes an options configuration object as parameter, and returns either a resolved, or reject, promise.

```ts
interface Config {
  reject?: boolean;
  timeout?: number;
  response?: any;
}
```

Usage:

```js
fakePromise({
  timeout: 1500, // in Milliseconds, default timeout is 200
  response: { a: 1, b: 2 }, // Can be whatever you want it to be.
  reject: false, // Default value will always be false.
});

// with async/await
async function DoSomething() {
    const myPromiseResponse = await fakePromise({
        response: 'Got it'}
    });
}
```

### keyByPromises

A method that accepts a keyByArguments map, and a callback function. It will return an object where every key will contain the resolved or rejected promise from the callback function.

Usage:

```js
const callbackFunction = async (id, filter) => {
  const response = await fetch('/api/some-path', {
    query: {
      id,
      filter,
    },
  }).then(res => res.json());
  return response;
};

async function DoSomething() {
  const keyByArgs = {
    first: {
      id: '123',
      filter: false,
    },
    second: {
      id: '234',
      filter: true,
    },
  };

  const myPromiseResponse = await keyByPromises(keyByArgs, callbackFunction);
}
```

### wrapWithPromise

A method that accepts a callback function, and wraps it with a Promise so it can be used within any async/await function closure.

Usage:

```js
const savePost = (method, body) => {
  return fetch('/api/some-path', {
    method,
    body,
  }).then(res => res.json());
};

async function DoSomething(blogPost) {
  const saveBlogPost = wrapWithPromise(postMessage);

  const savedBlogPost = await saveBlogPost(
    blogPost.id ? 'PUT' : 'POST',
    blogPost
  );

  return savedBlogPost;
}
```
