---
layout: layouts/base.njk
menu:
  visible: true
  title: 🕐 Now
  order: 2
---

## Now

Last updated: <time>16/01/26</time>

This page shows what I'm doing currently. For more information on
Now Pages, see
[this page](https://nownownow.com/about).

### Work

Still knee-deep in pose estimators and computer vision for livestock.

~~My radical opinion is that for specialist tasks Convnets are still better than
Vision Transformers.~~

I'm coming around to Vision Transformers, especially when considering they fare
better than ConvNets for occlusions. My problem with ViTs is that they're still
quite chunky compared to ConvNets, and you get 95% of the way there in a
controlled environment with a ConvNet.

Consider the following: a camera pointing top-down into a pig pen is likely to
have a limited stage. There are pigs, a trough, some hay, and that's it. The
occlusion you're likely to find is between pigs, not between pigs and
non-pigs-that-look-like-pigs. In this case, a ConvNet may well suffice.

If the camera includes background elements, there's a greater chance of
occlusion for these non-pig elements. At least one paper suggested a mask
applied prior to inference, which is all well and good but is an additional step
for our hypothetical Farmer Giles to set up.

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

~~I also replaced [nnn](https://github.com/jarun/nnn) with
[lf](https://github.com/gokcehan/lf). nnn is definitely lightweight, but lf does
more.~~ I went back to `nnn`. It's just lighter, and does what I want
a file manager to do and nothing more.

I also use [tomb](https://dyne.org/docs/tomb/) to secure files on a server,
where the files are kept on-server but the keys are kept on my laptop:

```sh
# Open a remote location with sshfs
sshfs <server>:/home/me/secure /tmp/cloud/

# Open a tomb in that location with tomb
tomb open /tmp/cloud/secure.tomb -k opening-key.key
```
It works rather well!

Incidentally, you could also use `sshfs` as a poor man's VSCode Remote. If you
have all your vim plugins on your machine, you may not need to reinstall all of
those on your server. If you use Tailscale SSH, make sure you start an SSH
session before using sshfs, otherwise sshfs tends to swallow the authorisation
magic link.
