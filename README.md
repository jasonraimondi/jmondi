# @jmondi/*

[![CI](https://github.com/jasonraimondi/jmondi/actions/workflows/ci.yaml/badge.svg)](https://github.com/jasonraimondi/jmondi/actions/workflows/ci.yaml)

Some reusable utility packages

[//]: # (INSERT_START)

## @jmondi/browser-storage

Supports null and serializable objects.

### Install

```bash
npm install @jmondi/browser-storage
```

### Usage 

#### Local Storage

Local storage is persistent after close.

```typescript
import { LocalStorage } from "@jmondi/browser-storage";

const localStorage = new LocalStorage();

localStorage.set("user1", null);
localStorage.set("user2", { email: "hermoine@hogwarts.com", name: "Hermoine" });

console.log(localStorage.get("user1"));
// null
console.log(localStorage.get("user2"));
// { email: "hermoine@hogwarts.com", name: "Hermoine" }
```

#### Session Storage

Session storage is reset when the browser is closed.

```typescript
import { SessionStorage } from "@jmondi/browser-storage";

const sessionStorage = new SessionStorage();

sessionStorage.set("user1", null);
sessionStorage.set("user2", { email: "hermoine@hogwarts.com", name: "Hermoine" });

console.log(sessionStorage.get("user1"));
// null
console.log(sessionStorage.get("user2"));
// { email: "hermoine@hogwarts.com", name: "Hermoine" }
```

#### Cookie Storage

Cookie storage is more configurable, see https://github.com/js-cookie/js-cookie#cookie-attributes for full options

```typescript
import type { CookieAttributes } from "js-cookie";
import { CookieStorage } from "@jmondi/browser-storage";

const cookieStorage = new CookieStorage();

const cookieOptions: CookieAttributes = {};

cookieStorage.set("user1", null, cookieOptions);
cookieStorage.set("user2", { email: "hermoine@hogwarts.com", name: "Hermoine" });

console.log(cookieStorage.get("user1"));
// null
console.log(cookieStorage.get("user2"));
// { email: "hermoine@hogwarts.com", name: "Hermoine" }
```


---

## @jmondi/mobile-first

Generates mobile first media queries for the [postcss-custom-media plugin](https://github.com/postcss/postcss-custom-media).

### Install

```bash
pnpm add @jmondi/mobile-first
```

### Usage 

An object with keys of strings, and values of the breakpoint. With the following input:

```javascript
const { generateMediaQueries } = require('@jmondi/mobile-first');

const result = generateMediaQueries({
  phone: 400,
  tablet: 800,
  desktop: 1200,
});

console.log(result);

// {
//   '--phone': `(min-width: 400px)`,
//   '--phone-only': `(min-width: 400px) and (max-width: 799px)`,
//   '--tablet': `(min-width: 800px)`,
//   '--tablet-only': `(min-width: 800px) and (max-width: 1399px)`,
//   '--desktop': `(min-width: 1400px)`,
//   '--desktop-only': `(min-width: 1400px)`,
// }
```

Which then you can use:

```javascript
// postcss.config.js

const { generateMediaQueries } = require('@jmondi/mobile-first');

module.exports = {
    plugins: {
        'postcss-custom-media': {
            importFrom: [{
                customMedia: {
                    '--light': '(prefers-color-scheme: light)',
                    '--dark': '(prefers-color-scheme: dark)',
                    ...generateMediaQueries({
                        phone: 400,
                        tablet: 800,
                        desktop: 1200,
                    }),
                },
            }],
        },
    },
};
```

Then in your css files

```postcss
@media (--phone) {
  html { background-color: teal; }
}
@media (--phone-only) {
  html { color: white; }
}
@media (--tablet) {
  html { background-color: tomato; }
}
@media (--tablet-only) {
  html { color: black; }
}
@media (--desktop) {
  html { background-color: purple; }
}
```

Will output 

```css
@media (min-width: 400px) {
  html { background-color: teal; }
}
@media (min-width: 400px) and (max-width: 799px) {
  html { color: white; }
}
@media (min-width: 800px) {
  html { background-color: tomato; }
}
@media (min-width: 800px) and (max-width: 1399px) {
  html { color: black; }
}
@media (min-width: 1400px) {
  html { background-color: purple; }
}
```


---

## @jmondi/electron-window

Electron window wrapper

### Install

```bash
npm install @jmondi/electron-window
```

### Usage

```typescript
import { app } from "electron";
import { join } from "path";
import { WindowManager } from "@jmondi/electron-window";

const mainWindowUrl = `file://${join(__dirname, "../../index.html")}`;
const windowManager = new WindowManager(mainWindowUrl);

const isMac = process.platform === "darwin";

export async function openMainWindow() {
  await windowManager.createWindow();
}

export function reloadAllWindows() {
  windowManager.reloadAll();
}

async function bootstrap() {
  await app.whenReady();
  await openMainWindow();

  app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (isMac) {
      windowManager.focusOrCreate();
    }
  });

  app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (!isMac) {
      app.quit();
    }
  });
}

bootstrap().catch(console.log);
```


---

## @jmondi/form-validator

Return a key value object of form errors using `zod`.

### Install

```bash
pnpm add @jmondi/form-validator zod
```

### Usage

```typescript
import { z } from "zod";
import { validateForm } from "@jmondi/form-validator";

const form = z.object({
  age: z.number().positive().max(150),
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});
```

```typescript
const data = {};
const errors = validateForm({ schema, data });
expect(errors).toStrictEqual({
  age: "Number must be less than or equal to 150",
  email: "Invalid email",
  password: "Required",
  rememberMe: "Required",
});
```

```typescript
const data = {
  age: 99,
  email: "bob@example.com",
  password: "bobobobobobob",
  rememberMe: true,
};
const errors = validateForm({ schema, data });
expect(errors).toBeUndefined();
```

```typescript
const data = {
  age: 99,
  email: "bob",
  password: "bobobobobobob",
  rememberMe: true,
};
const errors = validateForm({ schema, data });
expect(errors).toStrictEqual({
  email: "Invalid Email Address",
})
```

##### Deep Objects

```typescript
const data = {
  user: {
    email: "bob",
  }
};
const errors = validateForm({ schema, data });
expect(errors).toStrictEqual({
  user: {
    email: "Invalid Email Address",
  }
})
```

```typescript
const schema = z.object({
  user: z.object({
    email: z.string().email()
  })
})
const data = {
  user: {
    email: "bob",
  }
};
const options = { flatResult: true };
const errors = validateForm({ schema, data }, options);
expect(errors).toStrictEqual({
  "user.email": "Invalid Email Address",
})
```

##### Svelte Example

```html

<script lang="ts">
  import { z } from "zod";
  import { validateForm, ValidationResponse } from "@jmondi/form-validator";

  import { handleLogin } from "$lib/my-login-function";

  let errors: ValidationResponse;

  export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    rememberMe: z.boolean(),
  });

  const loginForm = {
    email: "",
    password: "",
    rememberMe: false,
  };

  async function submit() {
    errors = await validateForm({schema: loginSchema, data: loginForm});
    if (!errors) await handleLogin(loginForm);
  }
</script>

<div class="centered-form">
  <form on:submit|preventDefault="{submit}" data-test="login-form">
    <div class="form-control">
      <label for="email">Email</label>
      {#if errors?.email}<span class="error">{errors.email}</span>{/if}
      <input
          id="email"
          name="email"
          type="email"
          placeholder="johnny.appleseed@example.com"
          required="required"
          aria-label="email"
          aria-required="true"
          style="margin-bottom: 0;"
          bind:value="{loginForm.email}"
      />
    </div>

    <div class="form-control">
      <label for="password">Password</label>
      {#if errors?.password}<span class="error">{errors.password}</span>{/if}
      <input
          id="password"
          name="password"
          type="password"
          placeholder="***************"
          required="required"
          aria-label="password"
          aria-required="true"
          bind:value="{loginForm.password}"
      />
      <a class="forgot-password" href="/forgot_password">Forgot Password?</a>
    </div>

    <div class="form-control inline">
      <label for="rememberMe">Remember Me</label>
      <input id="rememberMe" type="checkbox" bind:checked="{loginForm.rememberMe}"/>
    </div>

    <div class="form-submit">
      <button type="submit">Submit</button>
    </div>
  </form>
</div>
```


---

## @jmondi/http-err

Common http errors with status codes.

### Install

```bash
pnpm add @jmondi/http-err
```

### Usage

```typescript
import { NotFoundError } from "@jmondi/http-err";

const id = "non-existant-id";

try {
  database.users.findBy(id);
} catch (e) {
  throw new NotFoundError(`[${id}] not found`);
}
```

```typescript
import express from "express";
import { HttpError } from "@jmondi/http-err";

async function handleErrors(err, req, res, next) {
  if (err instanceof InternalServerError) {
    // Do something specific for InternalServerErrors
    // like logging to an exception handling service
  } else if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
      context: JSON.stringify(err.context),
    });
  }
  next(err);
}

app = express();
app.get("/api", apiRoutes);
app.use(handleErrors);
```


---

## @jmondi/http-status

Common http status codes.

### Install

```bash
pnpm add @jmondi/http-status
```

### Usage

```typescript
import express from "express";
import { HttpStatus } from "@jmondi/http-status";

app = express();
app.get("/api", (req, res) => {
  res.status(HttpStatus.NO_CONTENT).end();
});
...
```


---

## @jmondi/route-strings

A typed route string generator to help keep urls under control.

### Install

```bash
pnpm add @jmondi/route-strings
## or
npm install @jmondi/route-strings
## or
yarn add @jmondi/route-strings
```

### Usage 

```typescript
import { Route } from "@jmondi/route-strings";

const ROUTES = {
  users: {
    list: new Route("/users"),
    show: new Route("/users/:id"),
    deeplink: new Route("/users/:id/:something/:here"),
  }
}

console.log(ROUTES.users.list.template);
// /users
console.log(ROUTES.users.show.template);
// /users/:id
console.log(ROUTES.users.list.create());
// /users
console.log(ROUTES.users.show.create({ id: 1 }));
// /users/1
console.log(ROUTES.users.deeplink.create({ id: 1, something: "magic", here: 2 }));
// /users/1/magic/2
```

Invalid params passed to create will throw error.

```typescript
console.log(ROUTES.users.show.create({ wrong: "this field doesnt exist" }));
// error missing id
```


---

## @jmondi/tsconfig

A strict tsconfig.json starting point.

### Install

```bash
pnpm add @jmondi/tsconfig
```

### Usage

```json5
{
  "extends": "@jmondi/tsconfig",
  "compilerOptions": {
    /* add your own options */
  }
}
```


---


[//]: # (INSERT_END)

## My External Packages

### [📁](https://github.com/jasonraimondi/ts-oauth2-server) @jmondi/oauth2-server

[![NPM Downloads](https://img.shields.io/npm/dt/@jmondi/oauth2-server?label=npm+downloads&style=flat-square)](https://www.npmjs.com/package/@jmondi/oauth2-server)

A standards compliant implementation of an OAuth 2.0 authorization server for Node that utilizes JWT and Proof Key for Code Exchange (PKCE), written in TypeScript. 

### [📁](https://github.com/jasonraimondi/prisma-generator-nestjs-graphql-strict) @jmondi/prisma-generator-nestjs-graphql

[![NPM Downloads](https://img.shields.io/npm/dt/@jmondi/prisma-generator-nestjs-graphql?label=npm+downloads&style=flat-square)](https://www.npmjs.com/package/@jmondi/prisma-generator-nestjs-graphql)

Generate strict nestjs graphql entities from prisma models
