# joefg.github.io

A developer blog.

## Use and deploy

Requires [Deno](https://deno.com). Make sure that is installed. Then:

* `./run serve` spawns a server.

* `./run build` compiles the site.

At the moment this is hosted on [GitHub Pages](https://docs.github.com/en/pages).

### Container

It is possible to run the site from a container. `./run container <command>` and
it creates a container and serves it from localhost at port 3000.

To halt, you will need to `./run container halt`. 

**Note: this command destroys the container and rebuilds it on every run**. This
is OK because no data is created in the container.

## Workflow

1. Checkout to a feature branch.

2. Make your change-- new post in `posts/` or otherwise.

3. Rebase onto `main` and push. The action takes care of everything.

## Colophon

Site built with:

* [Deno](https://deno.com/)

* [Lume](https://lume.land/),

* [Simple.css](https://simplecss.org/)

Using [lume-simple-blog](https://github.com/joefg/lume-simple-blog) and
available free-of-charge through that GitHub repository.
