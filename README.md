# nest-vite-node-starter

Nest.JS via vite example

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov

# e2e tests
$ npm run test:e2e
```

```
POST http://localhost:3000/user
Content-type: application/json

{"email":"user@mail.com","password":"123456"}
```

## Known Issues

-   https://github.com/swc-project/swc/issues/2117 (fixed)
-   under the hood (swc is used)
-   https://github.com/vitest-dev/vitest/issues/708 (will not be fixed) (issue when vite-plugin-node is not used)
    -   Build files with esbuild as a bundler (which might require a lot of custom options), and run tests against it
    -   Use swc plugin https://github.com/egoist/unplugin-swc

## Resources

-   https://github.com/axe-me/vite-plugin-node
-   https://github.com/vitejs/awesome-vite
