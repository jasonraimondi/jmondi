# @jmondi/route-strings

A typed route string generator to help keep urls under control.

## Install

```bash
pnpm add @jmondi/route-strings
# or
npm install @jmondi/route-strings
# or
yarn add @jmondi/route-strings
```

## Usage

```typescript
import { Route } from "@jmondi/route-strings";

const ROUTES = {
  users: {
    list: new Route("/users"),
    show: new Route("/users/:id"),
    deeplink: new Route("/users/:id/:something/:here"),
  },
};

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
