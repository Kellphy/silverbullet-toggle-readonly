# SilverBullet Toggle Read-Only

A simple [SilverBullet](https://silverbullet.md) plugin that adds an `Editor: Toggle Read-Only Mode` function to switch between edit and read-only modes — for desktop view.

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
