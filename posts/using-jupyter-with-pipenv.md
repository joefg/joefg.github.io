---
title: Using Jupyter with Pipenv
description: Building a data science environment
date: 2024-04-19
topic: Python
---

Being vaguely involved in data science tooling means I have some exposure to
[Jupyter](https://jupyter.org), and this is the setup that I found works for me.

## Environment Management

I use [Pipenv](https://pipenv.pypa.io/en/latest/)-- no real reason to use this
over [Poetry](https://python-poetry.org/), but I like Pipenv's ability to create
a virtualenv elsewhere on the system and I think the API's a little bit cleaner.

Really, as long as it creates a virtualenv and Jupyter can see this virtualenv,
it'll be fine.

Make sure you have Pipenv installed, then make a Pipenv environment.

```bash
pipenv --python 3.11        # Create the environment
pipenv install jupyter      # Add jupyter to it
pipenv run jupyter notebook # Spawn a Jupyter server
```

This approach does create a Jupyter install per project. I think this is fine,
it cuts down complexity, and Jupyter isn't that heavy these days. If you want to
use a system-wide Jupyter, you can do the following:

```bash
# Inside your project folder
cd project-folder/
pipenv install ipykernel

# Add the kernel to the user's ipython kernels
pipenv shell
python3 -m ipykernel install --user --name=<your-venv-name>

# Outside of the shell (deactivate)
jupyter notebook
```

This should allow your kernel to be used inside the system Jupyter server. I
prefer not doing this and keeping it simpler with a Jupyter server inside every
data science environment. There are disadvantages here: you can't run more than
one project at a time, and you can't share kernels between projects, but I
haven't run into those yet.

## The Runfile

In keeping with the
[Runfiles](https://github.blog/2015-06-30-scripts-to-rule-them-all/) that I use
elsewhere, this is a slim one that I use.

```bash
#!/usr/bin/env bash
set -euo pipefail

function help(){
cat << EOF
Python Data Science Environment

help    : Display help text
restore : Fetch dependencies
dev     : Spawn a notebook server
EOF
}

function run_restore(){
    pipenv install
}

function run_dev(){
    pipenv run jupyter notebook
}

function main(){
    cmd=${1-restore}
    shift || true
    case "$cmd" in
        help)
            help
            ;;
        restore)
            run_restore
            ;;
        dev)
            run_dev
            ;;
        *)
            echo "no-op $cmd"
            ;;
    esac
}

main "$@"
```

This allows me to `./run restore` to fetch my dependencies and `./run dev` to
spawn a notebook. Two commands that are shared with other projects to reduce
cognitive load. No more "oh, what's that command to run it again?", and if I
need a refresher. `./run help` tells me everything I need to stand it up again.

## Git Gotchas

1. Add `/.ipynb_checkpoints` to your `.gitignore`. They can get pretty large in
size and dealing with those is no fun later.

2. Be careful when committing notebooks because they can contain results from
cells. This might be what you want, but running them again changes the notebook
and this shows up in the diff. Git shows this as a gigantic JSON mess, and
GitHub/GitLab's no better.

In the early stages of your project, make a choice to either include results or
not include results. If you choose not to, you can use a tool like
[nbstripout](https://github.com/kynan/nbstripout) and a git hook to clean prior
to the commit. I'm inclined to not include the results because results should be
reproducible on any machine.
