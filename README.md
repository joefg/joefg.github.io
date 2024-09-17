# joefg.github.io

A developer blog.

## Use and deploy

Requires [Deno](https://deno.com). Make sure that is installed. Then:

* `deno task serve` spawns a development server

* `deno task build` compiles the site.

At the moment this is hosted on GitHub Pages using the action in
`.github/workflows/publish.yaml`.

## Workflow

1. Checkout to a feature branch.

2. Make your change-- new post in `posts/` or otherwise.

3. Rebase onto `main` and push. The GitHub Action should take
care of the rest.

## Colophon

Site built with:

* [Deno](https://deno.com/)

* [Lume](https://lume.land/),

* [Simple.css](https://simplecss.org/)

Using [lume-simple-blog](https://github.com/joefg/lume-simple-blog) and
available free-of-charge through that GitHub repository.
