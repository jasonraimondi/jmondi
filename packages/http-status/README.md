# @jmondi/http-status

Common http status codes.

## Install

```bash
pnpm add @jmondi/http-status
```

## Usage

```typescript
import express from "express";
import { HttpStatus } from "@jmondi/http-status";

app = express();
app.get("/api", (req, res) => {
  res.status(HttpStatus.NO_CONTENT).end();
});
...
```
