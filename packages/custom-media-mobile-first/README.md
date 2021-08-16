# @jmondi/mobile-first

Generates mobile first media queries for the [postcss-custom-media plugin](https://github.com/postcss/postcss-custom-media).

## Install

```bash
pnpm add @jmondi/mobile-first
```

## Usage 

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
//   '--phone': `(min-width: 0px)`,
//   '--phone-only': `(max-width: 799px)`,
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
@media (min-width: 0px) {
  html { background-color: teal; }
}
@media (max-width: 799px) {
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
