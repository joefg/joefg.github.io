---
title: "Bring back .plan files"
description: Why we should go back to the future and embrace plain text
date: 2024-05-29
---

> TL;DR we should bring back dotplans using Markdown and HTTP(S)

## What's a dotplan?

`.plan` files are a holdover from a period of time when everyone who was on a
networked computing environment could reasonably use a command line. They used
to be a way of finding information about a specific user (like whether they were
online, what their office hours were, and in the case of remote workers, where
in the world they actually were). All a user had to do was run `finger
<user>@<host>` and they would be given this information.

A famous use of the `.plan` file: [John
Carmack](https://github.com/ESWAT/john-carmack-plan-archive) would use them to
document what he was doing. In the days of Quake and Doom, there would even be
websites which were a frontend to `finger` which would archive what he was
doing, and this practice spread out of Id Software and into the wider Dallas
game design bubble.

I think many people are sick of the always-on nature of modern communications.

Why can't we bring `.plan` files back?

## What has changed since those days

1. Most networked devices are not a UNIX and do not have the `finger`
[daemon](https://en.wikipedia.org/wiki/Finger_(protocol)) running, and even if
they did, most routers sinkhole it from the outside world in the case of
residential connections, and most sysadmins now frown upon running any unneeded
services on developer machines.

2. Hosting a website is very easy. `.plan` files came around because it was
easier to write to a text file for an already-running daemon to pick up than it
was to stand up a web server with which to write text to. It's the opposite now.
For example, this site is currently hosted on GitHub Pages, which is very easy
for anyone with a GitHub account and a modicum of Git experience.

3. We have X *the everything app* now. Even John Carmack gave up his blog in
favour of Xitter. The nice thing about this distinction is that you can keep
your `.plan` file somewhere which requires a little technical skill to get at,
so you can write about technical topics and anything else with much greater
candour.

With this in mind, let's update the concept of a `.plan` file to the modern day.

## Proposing: neoplan

I propose *neoplan*: a HTTP(s) dotplan file. Back to the future with `neoplan`.
An anti-Facebook or anti-Xitter for people with technical chops. No images, no
comments, no dogpiles, no algorithms, just text.

I used something similar in a previous job: we were all on servers running
Apache on a VPN, and before Slack and Teams, we would put our office hours on
`index.html`, along with what we were doing that day and where in the world we
were working from.

### Hosting

Stick it in plain text on `<host>/.plan`. Serve it over HTTP(s) in
plain text.  Write it in Markdown (but this is entirely up to you, even write it
in [Org Mode](https://orgmode.org/) if you want). Update it in the text editor
of your choice. It's literally a text file. You could even set your web server
up to periodically copy notes from a Dropbox or something like that. It's up to you, but
you will be constrained by it being literally plain text and that is absolutely fine.

### Fetching

It should be accessible over HTTP(S) with a single `curl` request. The following should work:

```
curl <host>/.plan | $EDITOR
```

Alias this command to `neoplan` or something like that. It's just a `curl` oneliner.

### Goals

I don't want this to become gentrified like many other technical works. I don't
want a GUI for browsing `.plan` files. It should be down to the developer to
make something that works for them in this respect.

I want this to be for technical people only. The only way it can stay this way
is for it to be both complex for outsiders and ridiculously simple for insiders.
Tough enough to be significant but simple enough to protect. I want the
specification for this to fit in one sentence with a client in one line of Bash
so that it becomes part of software oral tradition.

It should be a safe space away from algorithms, indexers, and AI-generated slop.
While anything accessible over HTTP will be absorbed by the borg at some point,
I want this to be something that developers actually care about enough to not
want to ruin it for everyone.