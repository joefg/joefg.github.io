# joefg.github.io (jfg.name)

A developer blog.

## Use

Requires [Deno](https://deno.com). Make sure that is installed.
A runfile is provided for your convenience.

```
joefg.github.io (jfg.name)

help:                    Display help text
clean:                   Remove artefacts
lint:                    Lint project
build:                   Compile site
container <cmd|halt|rm>: Run command in container
serve:                   Serve on localhost:3000
```

## Deploy

This site is currently hosted on [GitHub
Pages](https://docs.github.com/en/pages), and is deployed on push to `main`
through an action.

## Container

It is possible to run the site from a container. `./run container <command>` and
it creates a container and serves it from localhost at port 3000.

To halt, you will need to `./run container halt`. 

**Note: this command destroys the container and rebuilds it on every run**. This
is OK because no data is created in the container.
