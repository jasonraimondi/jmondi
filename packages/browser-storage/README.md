# @jmondi/browser-storage

Supports null and serializable objects.

## Install

```bash
npm install @jmondi/browser-storage
```

## Usage 

### Local Storage

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

### Session Storage

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

### Cookie Storage

Session storage is reset when the browser is closed.

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