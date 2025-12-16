---
title: "Cheap ML Environment"
description: Reject cloud, embrace PC under the desk
date: 2025-11-24
location: Cambridge, England
topic: Ops
---

It's certainly true that machine learning model training is compute intensive, but
can you build a training computer on a budget?

### The old gaming PC

Quite a few years ago I had a gaming PC. It's pretty geriatric by today's standards:
an old Intel i5 processor and 16GB of RAM, paired to an Nvidia GTX1060 with 6GB of
VRAM. It sits under my desk.

I find that it's "reasonably good". I tried transfer learning on my laptop, and one
overnight run took seven hours. On this, it takes 50 minutes. Not blazing fast,
but "fast enough".

### Software

It runs [Ubuntu server](https://ubuntu.com/download/server), which works well enough for
what I want from it. It can handle CUDA drivers well enough.

```
joefg@ml:~ $ fastfetch
                             ....              joefg@ml
              .',:clooo:  .:looooo:.           --------
           .;looooooooc  .oooooooooo'          OS: Ubuntu 24.04.3 LTS (Noble Numbat) x86_64
        .;looooool:,''.  :ooooooooooc          Host: MS-7758 (1.0)
       ;looool;.         'oooooooooo,          Kernel: Linux 6.8.0-88-generic
      ;clool'             .cooooooc.  ,,       Uptime: 1 hour, 44 mins
         ...                ......  .:oo,      Packages: 869 (dpkg)
  .;clol:,.                        .loooo'     Shell: bash 5.2.21
 :ooooooooo,                        'ooool     Terminal: /dev/pts/4
'ooooooooooo.                        loooo.    CPU: Intel(R) Core(TM) i5-3570K (4) @ 3.80 GHz
'ooooooooool                         coooo.    GPU: NVIDIA GeForce GTX 1060 6GB [Discrete]
 ,loooooooc.                        .loooo.    Memory: 812.35 MiB / 15.57 GiB (5%)
   .,;;;'.                          ;ooooc     Swap: 0 B / 4.00 GiB (0%)
       ...                         ,ooool.     Disk (/): 37.38 GiB / 97.87 GiB (38%) - ext4
    .cooooc.              ..',,'.  .cooo.      Local IP (enp3s0): <snip>
      ;ooooo:.           ;oooooooc.  :l.       Locale: en_GB.UTF-8
       .coooooc,..      coooooooooo.
         .:ooooooolc:. .ooooooooooo'
           .':loooooo;  ,oooooooooc
               ..';::c'  .;loooo:'
```

My development environment on it is purely Python. I do my experiments in a Jupyter notebook,
with training details being published to TensorBoard.

If I want to access it when I'm not on my home network, I can do so with
[Tailscale](https://tailscale.com), which works really well. If I'm out and
about with my laptop and I want to check on a training run, I can connect to the
VPN and look at TensorBoard.

I also added a notification system that pings messages to my private Telegram
bot, so I can see what it's doing when I'm out in the field.

### Caveats

* This old graphics card isn't supported by newer versions of PyTorch, so I'm stuck with PyTorch version 2.6.0 and Python 3.9.

* It's a bit loud.

* It's not the most power efficient thing in the world.

* A powercut means I have to ask someone to reboot the machine.
