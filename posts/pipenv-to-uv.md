---
title: "Migrating Pipenv projects to uv"
description: How to migrate your Pipenv Python projects to uv
date: 2025-02-24
---

<div class="notice">
    ⚠️ <b>NOTICE</b>

    This uses Pipenv version 2024.4.1 and uv version 0.6.2 (6d3614eec 2025-02-19).

    Details may vary between versions of both, but the basic workflow should be the
    same.
</div>

For a long time, I've been a happy user of [Pipenv](https://pipenv.pypa.io/en/latest/).
It worked "well enough" for what I want a Python project manager to do, principally
pinning a Python version, pinning packages, and providing a common entry point to scripts
through `pipenv run`.

The state of the art has rolled on, and a new "good enough" package manager has arrived.

It's called [uv](https://github.com/astral-sh/uv). It aims to replace `pip`, `poetry`,
`venv`, `pipx`, and even `pipenv` with a single binary. It makes heavier use of caching,
enabling faster project builds (especially important in CI pipelines). I decided it was
time to migrate some personal projects to use `uv`. Here's how I did that with a project
which used `pipenv`.

### Existing Pipenv Projects

Suppose we have a project. This is some old AgriTech tooling that I dug up for this purpose.
It doesn't get much love these days.

```
.
├── agri_tools
│   ├── crop_index
│   └── __init__.py
├── data
├── notebooks
│   └── README.md
├── Pipfile
├── Pipfile.lock
├── README.md
├── run
└── tests
```

Like with most Pipenv projects, there's a `Pipfile` and a `Pipfile.lock` in there.

```
$ cat Pipfile
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
jupyter = "*"

[dev-packages]
pytest = "*"
mypy = "*"
pylint = "*"

[requires]
python_version = "3.12"
python_full_version = "3.12.7"
```

One sore spot of Pipenv is how the pinning is kept exclusively in the `Pipfile.lock`, which is where
you'll find version numbers. It's too big to copy and paste here verbatim, so this is a trimmed one.
You will see that it is a big old JSON file.

```
$ head -30 Pipfile.lock
{
    "_meta": {
        "hash": {
            "sha256": "933295b05d6fcbadd4572bee88c7cf681ecff77ac1d8cae9c2c86cf8bc2933bd"
        },
        "pipfile-spec": 6,
        "requires": {
            "python_full_version": "3.12.7",
            "python_version": "3.12"
        },
        "sources": [
            {
                "name": "pypi",
                "url": "https://pypi.org/simple",
                "verify_ssl": true
            }
        ]
    },
    "default": {
        "anyio": {
            "hashes": [
                "sha256:4c8bc31ccdb51c7f7bd251f51c609e038d63e34219b44aa86e47576389880b4c",
                "sha256:6d170c36fba3bdd840c73d3868c1e777e33676a69c3a72cf0a0d5d6d8009b61d"
            ],
            "markers": "python_version >= '3.9'",
            "version": "==4.6.2.post1"
        },
        "argon2-cffi": {
            "hashes": [
                "sha256:879c3e79a2729ce768ebb7d36d4609e3a78a4ca2ec3a9f12286ca057e3d0db08",
```

### Migrating a Pipfile and Pipfile.lock to pyproject.toml and uv.lock

The first step is to tackle dependencies. Pipenv does allow you to export dependencies
as a `requirements.txt`, so do that with `pipenv requirements > requirements.txt`.

If you want development dependencies separate from prod dependencies, you can do
so with:

```
$ pipenv requirements --dev > dev-requirements.txt # for dev
$ pipenv requirements > requirements.txt           # for regular
```

### Creating a uv project

Then run `uv init . --bare --python <version>`, with the version being the
python version that you were previously using.

The `--bare` creates just the `pyproject.toml`.

### Installing dependencies

Once you have this, import your dependencies with `uv add -r requirements.txt`.

If you look inside `pyproject.toml`, you will see that it has added every
requirement in requirements. It's considered better practice to keep prod
requirements separate from the dev requirements.

If you kept your dev dependencies separate from your prod dependencies, you can
import then separately with `uv add -r <dev-requirements.txt> --dev`.

### Runfiles

If you're like me (and you keep consistent entry points via a `run` shell script
in the repository), you may have some `pipenv run <script>` commands in there.

This is what the diff looked like for me.

```diff
diff --git a/run b/run
index d0defb2..092c316 100755
--- a/run
+++ b/run
@@ -17,20 +17,20 @@ EOF
 }

 function run_restore(){
-	pipenv install --dev
+	uv sync
 }

 function run_dev(){
-	pipenv run jupyter lab
+	uv run jupyter lab
 }

 function run_lint(){
-	pipenv run mypy "$THISDIR"/agri_tools/
-	pipenv run pylint "$THISDIR"/agri_tools/
+	uv run python3 -m mypy "$THISDIR"/agri_tools/
+	uv run python3 -m pylint "$THISDIR"/agri_tools/
 }

 function run_unit(){
-	pipenv run pytest
+	uv run pytest
 }

 function run_integration(){
```

Test the functionality from here. Your unit tests should work as before, and
your scripts should too. My `jupyterlab` worked fine.

### Cleanup

Once you're happy, you can remove your `pipenv`'s virtual environment and
delete your `Pipfile` and `Pipfile.lock`.

You can keep the `requirements.txt` files if you want and if you have an
environment which can't use `uv` but can use `pip install -r`, but I assume that
any environment I use will have `uv` on it to keep dev and prod dependency parity.