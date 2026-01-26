---
layout: layouts/base.njk
menu:
  visible: true
  title: 🕐 Now
  order: 2
---

## Now

<section class="notice">
Last updated: <time>26/01/26</time>

This page shows what I'm doing currently. For more information on
Now Pages, see
[this page](https://nownownow.com/about).
</section>

<div class="grid-parent">

<div>

### Work

Still knee-deep in pose estimators and computer vision for livestock.

I'm coming around to Vision Transformers, especially when considering they fare
better than ConvNets for occlusions. My problem with ViTs is that they're still
quite chunky compared to ConvNets, and you get 95% of the way there in a
controlled environment with a ConvNet.

I found some lighter architectures that work on similar principles to ViTs:
[Mobile ViTs](https://arxiv.org/abs/2206.02680), which have more of a focus on
speed than accuracy.

</div>
<div>

### Play

My motorcycle isn't much fun in the cold with all the mud on the road, so it's
currently resting in the barn. I bought some panniers which I should fit ahead
of my planned summer road trip.

I haven't published my recordings, but if you want a decent feel for how it
sounds, [this is pretty good](https://www.youtube.com/watch?v=6ZXD4AM-h6Q).

Once it gets warmer, I'll unearth the kayak, and take it up the broads, or over
to Dedham.

</div>

<div>

### Read

[MobileViT: Light-weight, General-purpose,
and Mobile-friendly Vision Transformer](https://arxiv.org/pdf/2110.02178) by
Mehta and Rastegari looks to be the ticket for getting a video-rate pig
behaviour detector working on a mobile device. ViTs will always be slower than
ConvNets, even with specialist hardware.

Apart from literature on using Vision Transformers, I'm reading:

* Erik Dietrich's [Developer
    Hegemony](https://daedtech.com/developer-hegemony-the-crazy-idea-that-software-developers-should-run-software-development/);

* Daniel Suarez's [Daemon](https://www.goodreads.com/book/show/6665847-daemon?) and
    [Freedom(tm)](https://www.goodreads.com/book/show/8488830-freedom). I've
    read these before, so I'm visiting again.

Some smaller pieces:

* [How Complex Systems Fail](https://how.complexsystems.fail) by Richard Cook. I
    give this to newbies on team.

</div>

<div>

### Use

Alias du jour: this one opens a new tmux session in your current directory with
the name of that directory as the session name.

```bash
function td() {
    tmux new -ADs "${PWD##*/}"
}
```
In addition, I swapped [VSCode](https://code.visualstudio.com) for
[Zed](https://zed.dev). I found Code to get really clunky and it dropped
a lot when connected to my development server, whereas Zed stays connected.
There are a few things I would change, I would like Zed to use the LSPs
specified in my `.venv` directory for that project, but nothing's perfect.

I'm also experimenting with [tinygrad](https://github.com/tinygrad/tinygrad).

</div>
