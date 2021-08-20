# @jmondi/form-validator

A wrapper around the yup package to return a key value object of errors

## Install

```bash
npm install @jmondi/form-validator
```

## Usage 

```typescript
import { createForm, validateForm } from "@jmondi/form-validator";

const schema = createForm({
  age: joi.number().required(),
  email: joi.string().email({ tlds: false }).required(),
  password: joi.string().min(8).required(),
  rememberMe: joi.boolean().required(),
});

let data = {}
let errors = validateForm({ schema, data })
// {
//   age: "This field is required",
//   email: "This field is required",
//   password: "This field is required",
//   rememberMe: "This field is required",
// }

data = {
  age: 99,
  email: "bob@example.com",
  password: "bobobobobobob",
  rememberMe: true,
}
errors = validateForm({ schema, data });
// undefined

data = {
  age: 99,
  email: "bob",
  password: "bobobobobobob",
  rememberMe: true,
}
errors = validateForm({ schema, data });
// {
//   email: "Invalid Email Address",
// }
```

#### Svelte Example

```sveltehtml
<script lang="ts">
    import joi from "joi";
    import { createForm, validateForm } from "@jmondi/form-validator";
    import { handleLogin } from "$lib/my-login-function"

    let errors: Record<string, string> = {};

    export const loginSchema = createForm({
        email: joi.string().email({ tlds: false }).required(),
        password: joi.string().min(8).required(),
        rememberMe: joi.boolean().required(),
    });

    const loginForm = {
        email: "",
        password: "",
        rememberMe: false,
    };

    async function submit() {
        errors = await validateForm({ schema: loginSchema, data: loginForm });
        if (!errors) await handleLogin(loginForm);
    }
</script>

<div class="centered-form">
    <form on:submit|preventDefault="{submit}" data-test="login-form">

        <div class="form-control">
            <label for="email">Email</label>
            {#if errors?.email}<span class="error">{errors.email}</span>{/if}
            <input id="email"
                   name="email"
                   type="email"
                   placeholder="johnny.appleseed@example.com"
                   required="required"
                   aria-label="email"
                   aria-required="true"
                   style="margin-bottom: 0;"
                   bind:value={loginForm.email}/>
        </div>

        <div class="form-control">
            <label for="password">Password</label>
            {#if errors?.password}<span class="error">{errors.password}</span>{/if}
            <input id="password"
                   name="password"
                   type="password"
                   placeholder="***************"
                   required="required"
                   aria-label="password"
                   aria-required="true"
                   bind:value={loginForm.password}/>
            <a class="forgot-password" href="/forgot_password">Forgot Password?</a>
        </div>

        <div class="form-control inline">
            <label for="rememberMe">Remember Me</label>
            <input id="rememberMe" type="checkbox" bind:checked={loginForm.rememberMe}>
        </div>

        <div class="form-submit">
            <button type="submit">Submit</button>
        </div>
    </form>
</div>
```