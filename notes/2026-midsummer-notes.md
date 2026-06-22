---
title: "2026's Midsummer Potpourri"
description: Various dishes
date: 2026-06-22
location: Ely, England
topic: Assorted notes
---

Some notes from the midsummer.

### Goodbye Arch

The [AUR
compromise](https://archlinux.org/news/active-aur-malicious-packages-incident/)
provided an impetus to sort my laptop out.

It's a shame, as [CachyOS](https://cachyos.org/) did really good things for
optimisation. There's nothing wrong with the Arch repositories themselves.
The Arch team do a really good job with the core Arch repositories. Sadly,
the AUR, which is often touted as a great selling point of Arch, is broken, and
is based on a trust mechanism which doesn't work anymore.

The Linux trust model is broken. Package maintainers had a hard time managing
their systems before AI came along. The flaw in the AUR is that a user could
claim an orphaned repository and at some point they would be granted it. Now
doing this a few years ago takes a good while, but with AI, it became easier to
create sockpuppet accounts, and sure enough, lots of accounts were at it, then
one day, they pushed a rootkit. It's easy to blame the AUR but its model
is now dangerous, and sandboxing is required.

With that in mind, I'm using [Bluefin](https://projectbluefin.io/), which
containerises a lot of applications and does not encourage a reliance on
unofficial repositories with global access. If I do need Arch at any
point, I can spin up a [Distrobox](https://github.com/89luca89/distrobox) and
still use Arch.

### A better notebook

I found a replacement for the venerable [Jupyter](https://jupyter.org/):
[marimo](https://marimo.io/).

It looks nicer, diffs cleaner, has tools for computer vision and GIS, and
also produces good dashboards.

### 12b is all you need

I have settled on a model for my local inference stack:
[gemma4:12b](https://huggingface.co/google/gemma-4-12B).

12b is multimodal, has a good context window, and runs quite nicely
on my RTX 2000 Ada Generation. In my experience it uses 10GB of VRAM idle,
but quantisation can bring that down to the point where it could be ran on
a laptop.

Only thing is that it nails GPU time. But it'll get better and better.
I do think that local AI will beat hosted AI, especially in
privacy-oriented applications and in coding, where latency is an
annoyance.

### Agentic data wrangling

A big part of GIS is sorting the data out, because nobody gets
it right, and everybody has their own way of doing things.

It used to be a manual task. Find data, download, extract and
put into database, either document or automate, then merge
into the data importer.

Now? That's not the case anymore. You can get your agent to do it.
Give it some GIS skills (like using ogr2ogr, the ability to write
SQL and Bash), then send it on its way. Once your agent has done its
job, you give the final touches, then merge.

How long before the human is out of this loop?
