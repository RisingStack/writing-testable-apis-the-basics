# Writing testable HTTP APIs using Node.js - the basics

I remember writing my first test cases - it was everything but nice and clean.
Testing done right is not easy.

It is not just about how you write your tests, but also how you design your entire codebase.
This post intends to give an insight on how we develop testable HTTP APIs at [RisingStack](http://risingstack.com).

All the examples use [Joyent's](http://www.joyent.com/) [restify framework](https://github.com/mcavage/node-restify),
and can be found at [RisingStack's Github](https://github.com/RisingStack/writing-testable-apis-the-basics) page.

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

```javascript
  "scripts": {
    "test": "mocha test"
  }
```

This will work without installing mocha globally, as npm will look for `node_modules/.bin`, and
place it on the `PATH`.

### Adding chai to your project

```bash
npm install chai --save-dev
```

Then using [chai](http://chai.com) it is time to write the first test case, just to demonstrate
how mocha and chai plays together.

```javascript
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

Unit tests are the basic building block of tests, where each test case is independent from
others. Unit tests provide a living documentation of the system and are
extremely valuable for design feedback: one looking at your test cases can figure out easily what
the given unit does, how you engineered it, what interfaces does it expose.

As a side effect, unit tests can verify if your units work correctly.

The magic word here is: TDD, meaning Test-drive development.
TDD is the process of writing an initially failing test case, that defines
a function - this is where you design the interfaces of your unit.

After that all you have to do is make the tests pass by implementing the described
functionality.

When writing unit tests, we do not want to deal with the given unit's dependencies,
so we want to use mocks instead of them. Mocks are special objects that simulate the
behavior of the mocked out dependencies. For this purpose we are going to use
[Sinon.JS](http://sinonjs.org).

Let's take an example of mocking out MongoDB. Sure, first you will need `sinon` installed.

```bash
npm install sinon --save-dev
```

As we are doing TDD, first let's write our (initially) failing unit test for a Mongoose model.
It will be a model called `User` with a static method `findUnicorns`.

How to do this? Let's take a look at the necessary steps:

- start with the test setup
- calling the object under test's method
- finally asserting

```javascript
var sinon = require('sinon');
var expect = require('chai').expect;

var mongoose = require('mongoose');
var User = require('./../../lib/User');
var UserModel = mongoose.model('User');

describe('User', function() {
  it('#findUnicorns', function(done) {

    // test setup
    var unicorns = [ 'unicorn1', 'unicorn2' ];
    var query = { world: '1' };

    // mocking MongoDB
    sinon.stub(UserModel, 'findUnicorns').yields(null, unicorns);

    // calling the test case
    User.colorizeUnicorns(query, function(err, coloredUnicorns) {

      // asserting
      expect(err).to.be.null;
      expect(coloredUnicorns).to.eql(['unicorn1-pink', 'unicorn2-purple']);

      // as our test is asynchronous, we have to tell mocha that it is finished
      done();
    });
  });
});
```

Nice, huh? The "only" job left here is to do the actual implementation.
(it can be found in the `lib` folder)

## Putting the pieces together - writing integration tests

All our unit tests are passing, great! But how will the system as a whole function?
This is where integration tests come in.

During integration testing unit tested parts are combined to verify functional and
performance requirements.

For integration tests we will use [hippie](https://github.com/vesln/hippie).
hippie is a thin request wrapper that enables powerful and intuitive API testing.

Add hippie to your project with:

```bash
npm install hippie --save-dev
```

To demonstrate what hippie is capable of, let's create an HTTP endpoint!

This endpoint will serve `GET` requests at `/users`. For building APIs using JSON,
you can use [json:api](http://jsonapi.org/) as a reference.

```javascript
var hippie = require('hippie');
var server = require('../../lib/Server');

describe('Server', function () {
  describe('/users endpoint', function () {
    it('returns a user based on the id', function (done) {
      hippie(server)
        .json()
        .get('/users/1')
        .expectStatus(200)
        .end(done);
    });
  });
});
```

The above example queries the server for the user with id=1. You can check the
basic implementation in the `lib/Server.js` file.

## Next up

Now you have learnt all the basics - but what will come next? We will dive deeper in how we
write APIs at [RisingStack](http://risingstack.com), including mocking external APIs like Facebook and
debug performances issues using DTrace.
