---
title: "Back to GitHub Pages"
description: Ops
date: 2026-03-02
location: Ely, England
topic: Operations
---

I decided to bin my old personal portfolio site (previously at
<https://jfg.name>) and combine it with my blog (previously at
<https://joefg.pages.dev>).

### Migration

1. Delete `joefg.pages.dev`. No longer required.

2. Move repository to `joefg.github.io` and make it public. Double checked
to make sure I didn't commit any credentials (and being a good Git citizen,
I did not).

3. Add a workflow.

```yaml
name: Publish on GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Clone repository
        uses: actions/checkout@v4

      - name: Setup Deno environment
        uses: denoland/setup-deno@v2
        with:
          cache: true

      - name: Build site
        run: ./run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "_site"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

My `./run` file handles basically everything in terms of compilation, so
I didn't have to change too much.

4. Done!

### Other changes

I decided to add more information about myself on the home page, only show
recent posts there, and add a link to a dedicated archive page.
