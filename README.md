# @jmondi/packages

[![Unit Tests](https://github.com/jasonraimondi/jmondi/actions/workflows/unit_test.yaml/badge.svg)](https://github.com/jasonraimondi/jmondi/actions/workflows/unit_test.yaml)

Sharing some of my resuable packages in this monorepo

## List of Packages

#### [`@jmondi/browser-storage`](./packages/browser-storage)

* Util functions for local and session storage that handles namespacing as well as json serializing and parsing values.

#### [`@jmondi/electron-window`](./packages/electron-window)

* Wrapper function for electron's BrowserWindow.

#### [`@jmondi/mobile-first`](./packages/custom-media-mobile-first)

* Helper for adding custom media queries to PostCSS.

#### [`@jmondi/form-validator`](./packages/form-validator)

#### [`@jmondi/oauth2-server`](https://github.com/jasonraimondi/ts-oauth2-server)

* A standards compliant implementation of an OAuth 2.0 authorization server for Node that utilizes JWT and Proof Key for Code Exchange (PKCE), written in TypeScript. 

#### [`@jmondi/route-strings`](./packages/route-strings)

* Manage and create typed route strings for your applications.

## Contributing

```bash
pnpm install
```

```bash
pnpm publish --access public
```
