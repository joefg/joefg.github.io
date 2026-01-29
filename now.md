---
layout: layouts/base.njk
menu:
  visible: true
  title: 🕐 Now
  order: 2
---

## Now

<section class="notice">

**Last updated: <time>29/01/26</time>**

This page shows what I'm currently up to.

For more information on Now Pages, see
[this page](https://nownownow.com/about).

</section>

<div class="grid-parent">

<div>

### Work

Still knee-deep in pose estimators and computer vision for livestock.

I found some lighter architectures that work on similar principles to ViTs:
[Mobile ViTs](https://arxiv.org/abs/2206.02680), which have more of a focus on
speed than accuracy.

</div>
<div>

### Play

My motorcycle isn't much fun in the cold with all the mud on the road, so it's
currently resting in the barn. I bought some panniers which I should fit ahead
of my planned summer road trip.

Once it gets warmer, I'll unearth the kayak, and take it up the broads, or over
to Dedham.

</div>

<div>

### Read

I'm reading:

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

I'm also experimenting with [tinygrad](https://github.com/tinygrad/tinygrad).

</div>
