---
title: "Static hosting on Cloudflare"
description: Various dishes
date: 2025-12-15
location: Silicon Fen, England
topic: Ops
---

<p/>
<section class="notice">

⚠️ **UPDATES**

15/12/25: Amended typo in the `migration` section. It should point to the
Cloudflare runner deno bin location, not the vercel one.

Also added aside on the $1 VPS.

</section>

This blog is now hosted at [joefg.pages.dev](https://joefg.pages.dev).

A few reasons why:

1. I wanted to free up my domain name for another site.

2. I wanted to "set and forget", and it looks to have worked well enough
for my [Git Book](https://git-for-graduates.pages.dev).

3. I saw that `joefg.pages.dev` was available and I wanted to nab it before
someone else did.

### Migration

Migration was actually rather easy.

* Make sure all links are relative to the hostname. Lume does this for you.

* My `./run build` script relied on an install of Deno which wasn't on the
    runner. The [Lume
    docs](https://lume.land/docs/advanced/deployment/#deno-deploy) cover this.
    For posterity:

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh \
    && /opt/buildhome/.deno/bin/deno task build
```

* Point Cloudflare to the repository and set it to run on pushes to `main`. This
is fine, because I'm the only one who pushes to main, and even then I tend to be
the good citizen and make a pull request so I can eyeball the diff.

### Alternatives

[Deno Deploy](https://deno.dev) is worth trying. I tried it but it wouldn't let
me have `joefg.deno.net` as a blog, or `blog.joefg.deno.net`.

Vercel is also an option that I've used professionally in the past.

Really though, I just like Cloudflare. The free tier allows for unlimited
requests and unlimited bandwidth.

One day I'll snag the mythical $1 VPS and just stick it on there.
