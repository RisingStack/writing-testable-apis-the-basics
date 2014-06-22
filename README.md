# Writing testable HTTP APIs - the basics

I remember writing my first test cases - it was everything but nice and clean.
Testing done right is not easy.
It is not just about how you write your tests, but also how you design your entire codebase.
This post intends to clear that up in the context of HTTP APIs.

## Unit tests

Unit tests are the basic building block of tests, where each test case is independent from
others. Unit tests provide a living documentation of the system and are
extremely valuable for design feedback: one looking at your test cases can figure out easily what
the given unit does, how you engineered it, what interfaces does it expose.

As a side effect, unit tests can verify if your units work correctly.

## Integration tests

All our unit tests are passing, great! But how will the system as a whole function?
This is where integration tests come in.

During integration testing unit tested parts are combined to verify functional and
performance requirements.

## Setting up your test environment

In order to run our test cases, we need a test runner and an assertion library.
The test runner will sequentially run each test case, while the assertion library
will check if the expected value equals the outcome.

But enough of the theory, let's setup our test runner and assertion library!
For this post, we will use mocha as our test runner, and chai as our assertion library.

### Adding mocha to your project

```
npm install mocha --save-dev
mkdir test
```

It will install [mocha](http://visionmedia.github.io/mocha/) and put it as a development
dependency to your `package.json`. Then you should put all your test cases
under the `test` folder.

Also, it is convenient to put it into your `package.json`'s scripts section, so it can be
run using the `npm test` command.

```
  "scripts": {
    "test": "mocha test"
  }
```

This will work without installing mocha globally, as npm will look for `node_modules/.bin`, and
place it on the `PATH`.

### Adding chai to your project

```
npm install chai --save-dev
```

Then using [chai](http://chai.com) it is time to write the first test case, just to demonstrate
how mocha and chai plays together.

```
// test/string.js
var expect = require('chai').expect;

describe('Math', function () {
  describe('#max', function () {
    it('returns the biggest number from the arguments', function () {
      var max = Math.max(1, 2, 10, 3);
      expect(max).to.equal(10);
    });
  });
});
```

The above test can be run with `npm test`.

## Designing your codebase - time for unit tests



## Putting the pieces together - writing integration tests

- do not mock out databases

## Mock out third-party APIs
