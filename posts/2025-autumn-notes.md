---
title: "2025's Autumn Potpourri"
description: Various dishes
date: 2025-11-04
location: Wivenhoe, England
topic: Work notes
---

Some notes from the autumn.

### Updates to my stack

* I'm experimenting with all-in-one open-source backends, chiefly
    [PocketBase](https://pocketbase.io/) and [Supabase](https://supabase.com/).
    Haven't figured out a way to marry [FastHTML](https://fastht.ml) to either
    yet (short of connecting right to the datastore) though.

* Going back into AI means I'm a bit late to the party, but I find PyTorch to be
    as complicated as TensorFlow these days. I find
    [Tinygrad](https://github.com/tinygrad/tinygrad)'s execution model
    interesting. Really though, once you have your model and can export it to an
    [onnx](https://onnx.ai/), your choice of framework becomes superfluous.

* I'm a lousy designer, so I use a CSS framework. [PicoCSS](https://picocss.com)
    looks nice and just works, but I found a
    [bug](https://github.com/picocss/pico/issues/701) with the drop down on Firefox,
    which hasn't been fixed. I'm enjoying [DaisyUI](https://daisyui.com/)
    though. There comes a point where Semantic HTML runs into brick walls, and
    at least DaisyUI avoids Tailwind's build step, allowing integration with
    [FastHTML
    apps](https://github.com/AnswerDotAI/fasthtml-example/blob/main/02_chatbot/basic.py).

### Uses for old hardware

My old [Google Pixel 6](https://en.wikipedia.org/wiki/Pixel_6) used to just sit
in the drawer languishing until I found an [app that can turn it into a pretty
good desk
clock](https://play.google.com/store/apps/details?id=com.samvd.standby).

Then it turned into a little web server by running a web service on it
through [Termux](https://termux.dev/en/). If you're so inclined, you could
do some proper development work on it, but I use it to host a personal [Telegram
Bot](https://github.com/joefg/uv-telegram-bot). Note that I don't need to tunnel
it to the outside world because of how Telegram's Bot API works.

These days it sits in a wireless charging dock on my desk. I cobbled one
together using a charger, a cheap MagSafe charger, and a little cradle
from IKEA.

### hyprland

My last foray into using a tiling window manager was using
[i3](https://i3wm.org/), then [Sway](https://swaywm.org/). I thought they were
nice enough (and with some configuration could be made into very pretty things
indeed), but I was always concerned about how portable the setups were, because
by the end of it, my setup was tailored specifically to my old ThinkPad X220.

Then [Omarchy by DHH](https://omarchy.org/) came along, and brought a little
window manager called [Hyprland](https://hypr.land) into wider attention. Being
a student I have a little time on my hands, so I decided to give it a go.

![Hyprland](/img/hyprland-2025.webp)

With my laptop docked I have two decent displays (and have no use for a third),
so I wanted to turn the screen off automatically. I can do this with `hyprctl`,
a command line control utility for Hyprland.

```
#!/usr/bin/env bash 

if [ "$(acpi -a)" == "Adapter 0: on-line" ]; then
  hyprctl keyword monitor "eDP-1, disable"
else
  hyprctl keyword monitor "eDP-1, enable"
fi
```

Map this to an autorun in your config and you're laughing.

```
bindl = , switch:on:Lid Switch, exec, ~/.config/hypr/scripts/lid-closed
```

### Book review: The Shockwave Rider by John Brunner (1975)

I'm sure you're familiar with the
[Cyberpunk](https://www.britannica.com/art/cyberpunk) genre. Man on the run from
a surveillance system, hacking into the mainframe to stay one step ahead, might
bump into a love interest, definitely remains cynical throughout.

There's some discussion about the first Cyberpunk novel. Everyone thinks of Neal
Stephenson's [Snow
Crash](https://www.goodreads.com/book/show/61240297-snow-crash) from 1994, or
William Gibson's [Sprawl trilogy](https://en.wikipedia.org/wiki/Sprawl_trilogy)
from 1984, but there's one book that predated both, and that book is John
Brunner's *The Shockwave Rider*. Give it a read.

The term *Computer Worm* comes from this book!

### GPU poverty

I'm currently without a good graphics card, so I've been doing some training on
my laptop's CPU. Even when just training a final layer it takes a while (one
project takes ten minuntes per epoch), so I'm looking into alternatives.

1. Hosted GPUs. [Paperspace](https://www.paperspace.com/) offers such a
   service.

2. Hosted notebooks. [Google Colab](https://colab.research.google.com/) is an
   example, but doesn't fit my use case, and I use PyTorch, not TensorFlow.

3. Hosted services. [AWS SageMaker](https://aws.amazon.com/sagemaker/) is an
   option.

4. Building my own box. You don't need a gaming PC for this, just a workstation
   and a GPU. [Here's a guide](https://www.youtube.com/watch?v=iflTQFn0jx4).

### VPNs

[Tailscale](https://tailscale.com/) replaced OpenVPN and `ssh -L` for me. No
more OpenVPN server, just a Tailscale instance, and I can securely access
machines in that group without exposing ports on any device. It uses
[WireGuard](https://www.wireguard.com/) magic and works really well, and it
traverses NAT for you, so it doesn't require any uPnP horrors. Never port
forward again!
