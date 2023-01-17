# @jmondi/form-validator

Return a key value object of form errors using `zod`.

## Install

```bash
pnpm add @jmondi/form-validator zod
```

## Usage

```typescript
import { z } from "zod";
import { parseForm } from "@jmondi/form-validator";

const RegisterSchema = z.object({
  age: z.number().positive().max(150),
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});
```

```typescript
const data = {};
const { errors } = parseForm({ schema: RegisterSchema, data });
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
const { errors } = parseForm({ schema: RegisterSchema, data });
expect(errors).toBeUndefined();
```

```typescript
const data = {
  age: 99,
  email: "bob",
  password: "bobobobobobob",
  rememberMe: true,
};
const { errors } = parseForm({ schema: RegisterSchema, data });
expect(errors).toStrictEqual({
  email: "Invalid Email Address",
});
```

#### Deep Objects

```typescript
const data = {
  user: {
    email: "bob",
  },
};
const { errors } = parseForm({ schema: RegisterSchema, data });
expect(errors).toStrictEqual({
  user: {
    email: "Invalid Email Address",
  },
});
```

```typescript
const schema = z.object({
  user: z.object({
    email: z.string().email(),
  }),
});
const data = {
  user: {
    email: "bob",
  },
};
const options = { flatResult: true };
const { errors } = parseForm({ schema: RegisterSchema, data }, options);
expect(errors).toStrictEqual({
  "user.email": "Invalid Email Address",
});
```

#### Svelte Example

```html
<script lang="ts">
  import { z } from "zod";
  import { parseForm, ValidationResponse } from "@jmondi/form-validator";

  import { handleLogin } from "$lib/my-login-function";

  let errors: ValidationResponse;

  export const LoginSchema = z.object({
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
    let {
      data,
      errors
    } = await parseForm<typeof LoginSchema>({ schema: LoginSchema, data: loginForm });
    if (!errors) await handleLogin(data);
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
      <input id="rememberMe" type="checkbox" bind:checked="{loginForm.rememberMe}" />
    </div>

    <div class="form-submit">
      <button type="submit">Submit</button>
    </div>
  </form>
</div>
```