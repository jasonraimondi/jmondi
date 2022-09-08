# @jmondi/http-err

Common http errors with status codes.

## Install

```bash
pnpm add @jmondi/http-err
```

## Usage

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
