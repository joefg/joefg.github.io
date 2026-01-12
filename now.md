---
layout: layouts/base.njk
menu:
  visible: true
  title: 🕐 Now
  order: 2
---

## Now

Last updated: <time>12/01/26</time>

This page shows what I'm doing currently. For more information on
Now Pages, see
[this page](https://nownownow.com/about).

### Work

Still knee-deep in pose estimators and computer vision for livestock.

~~My radical opinion is that for specialist tasks Convnets are still better than
Vision Transformers.~~

I'm coming around to Vision Transformers, especially when considering they fare
better than ConvNets for occlusions.

Currently experimenting with pruning and quantisation, which should shrink a ViT
from ~300MB to something quite a bit less than that.

### Play

My motorcycle isn't much fun in the cold with all the mud on the road, so it's
currently resting in the barn.

### Read

[The Creative
Act](https://www.theguardian.com/music/2022/feb/11/rick-rubin-def-jam-founder-producer-debut-book)
by Rick Rubin. Thanks to `@coastalfuturist` for shilling it so hard, I finally
got around to reading it.

### Use

I replaced `ls` with [eza](https://github.com/eza-community/eza) on my laptop.
It's worth it for one feature alone, which is the ability to show a file's
permissions in Octal. It certainly saves the `ls <file>` and `stat <file>` dance
to see its permissions.

I also replaced [nnn](https://github.com/jarun/nnn) with
[lf](https://github.com/gokcehan/lf). nnn is definitely lightweight, but lf does
more.

I also use [tomb](https://dyne.org/docs/tomb/) to secure files on a server,
using the following:

```sh
# Open a remote location with sshfs
sshfs -o alow_root <server>:/home/me/secure /mnt/cloud/

# Open a tomb in that location with tomb
tomb open /mnt/cloud/secure.tomb -k opening-key.key
```

It works rather well!
