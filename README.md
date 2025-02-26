# SilverBullet Toggle Read-Only

Simply creates a function called `Editor: Toggle Read-Only Mode` to switch between edit and read-only modes. There is a built-in one that works only for mobile.

## Build

make sure you have [SilverBullet installed with Deno](https://silverbullet.md/Install/Deno).

```shell
deno task build
deno task build && cp *.plug.js /SB_PATH/_plug/
```

or simply:

Add following to your `PLUGS` file, and run `Plugs: Update`.

```
- ghr:numanhg/silverbullet-toggle-readonly
```
