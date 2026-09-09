# joefg.github.io (jfg.name)

A developer blog.

## Use

Requires [Deno](https://deno.com). Make sure that is installed.
A justfile is provided for your convenience. Run `just` to see
what it can do.

```
Available recipes:
    clean             # Removes artefacts
    lint              # Checks codebase
    build             # Builds site
    serve             # Serves site

    [container]
    container         # Builds container
    remove-container  # Removes container
    run-container cmd # Runs container
    stop-container    # Stops container
```

## Deploy

This site is currently hosted on [GitHub
Pages](https://docs.github.com/en/pages), and is deployed on push to `main`
through an action.

## Container

It is possible to run the site from a container. `just container` builds the
container and and `just run-container <cmd>` runs that container using an
argument from the justfile.

To halt, you will need to run `just stop-container`. 

To build it again, you will want to `just remove-container`.
