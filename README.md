>
> # Testing APIs
>
> ## Sketch
>
> The example code will use koa/express. It does not make a big difference.
> If we will have the time we can do it for both.
>
> 1. Unit tests in general
> 2. Integration tests in general
> 3. How to structure your code, so it can be easily tested
> 4. Using a test runner (mocha)
> 5. Writing unit tests
>   - how to mock databases (using sinon)
> 6. Writing integration tests with hippie
>   - when writing integration tests, we do not mock out the database
> 7. Mocking out APIs using nock (example: integration testing microservices)

# Writing testable REST APIs

I remember writing my first test-cases - it was everything but nice and clean. Testing done right is not easy.
It is not just about how you write your tests, but also how you structure your entire codebase.
This post intends to clear that up in the context of REST APIs.

## Unit tests

Unit tests are the basic building block of tests, where each test case is independent from
others. The goal of unit tests to individually test if parts of the application are correct.

Also, unit tests provide a living documentation of the system. Your fellow developer can look
at your tests, and get a basic understanding of what is going on in your modules.

## Integration tests

All our unit tests are passing, great! But how will the system as a whole function?
This is where integration tests come in.

During integration testing unit tested modules are combined to verify functional and
performance requirements.

## Setting up your test environment

In order to run our test cases, we need a test runner and an assertion library.
The test runner will sequentially run each test case, while the assertion library
will check if the expected value equals the outcome.

But enough of the theory, let's setup our test runner and assertion library!
For this post, we will use mocha as our test runner, and chaijs as our assertion library.

### Adding mocha to your project

```
npm install mocha --save-dev
mkdir test
```

It will install mocha and put it as a development dependency to your package.json.
Then you should put all your test cases under the `test` folder.

Also, it is convenient to put it into your `package.json`'s scripts section, so it can be
run using the `npm test` command.

```
  "scripts": {
    "test": "mocha test"
  }
```

### Adding chaijs to your project

## Making your codebase modular - time for unit tests

## Putting the pieces together - writing integration tests

## Mock out third-party APIs
