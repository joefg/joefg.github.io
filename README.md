# joefg.pages.dev

A developer blog.

## Use and deploy

Requires [Deno](https://deno.com). Make sure that is installed. Then:

* `./run serve` spawns a server.

* `./run build` compiles the site.

At the moment this is hosted on [Cloudflare Pages](https://pages.dev).

### Cloudflare

The Cloudflare runners don't have Deno installed, so the build command is:

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh && /opt/buildhome/.deno/bin/deno task build
```

This will be the subject of automation at some stage.

## Workflow

1. Checkout to a feature branch.

2. Make your change-- new post in `posts/` or otherwise.

3. Rebase onto `main` and push. Cloudflare will take care of everything
else.

## Colophon

Site built with:

* [Deno](https://deno.com/)

* [Lume](https://lume.land/),

* [Simple.css](https://simplecss.org/)

Using [lume-simple-blog](https://github.com/joefg/lume-simple-blog) and
available free-of-charge through that GitHub repository.
