---
title: "Deno and the problem of venture-funded runtimes"
description: Small rant.
date: 2026-11-02
location: Wivenhoe, England
topic: JavaScript
---

This site is currently built using
[lume](https://lume.land/docs/overview/about-lume/), which runs on the
[deno](https://deno.com) runtime. It took a while for me to develop
a writing and site update workflow, but now it's something I've been
perfectly happy with for a year.

There was a lot of buzz around Deno a few years ago and it does
quite a few things really well: native TypeScript, better performance,
permissioned access to system calls, that sort of thing. It was
sold as "Node if it could be written again", and it worked quite well.

This post isn't really about Deno. I like Deno and have zero complaints.

My problem is with venture-funded runtimes. Chiefly: once they've hit
critical mass via viral open-contribution, they take venture funding
before being flipped, making product compromises along the way.

We saw this with [bun](https://bun.sh). It was
[acquired by ANT](https://bun.sh/blog/bun-joins-anthropic) because it is
the basis of the Claude Code. Anthropic then decided to
[rewrite](https://bun.com/blog/bun-in-rust) in Rust away from Zig because
[Zig has a No AI policy](https://ziglang.org/code-of-conduct/), and also
one suspects that Anthropic wanted to advertise Claude Code's powers to
enterprise users. It was a typical VC play: [pump pump pump until
acquisition](https://andrewkelley.me/post/my-thoughts-bun-rust-rewrite.html).

So maybe the [Cloudflare Deno acquisition](https://deno.com/blog/cloudflare)
might be a good thing. After all, Cloudflare is actually pretty reliable. I
use it for a few prod services myself. It can't be bad, right?

Right near the bottom:

> We will support the Deno runtime for another year with monthly releases
> containing bug fixes and security updates. After that year we will end our
> development of the Deno runtime. Deno will remain open source, and we welcome
> others who want to continue its development.

So Cloudflare gets the Deno magic and the containerised JavaScript work, and
the open source community gets the carcass after it has been picked clean,
no guarantees, community can take over, by the way Cloudflare can still
[pick the good bits](https://github.com/denoland/deno/blob/main/LICENSE.md)
to add value to itself while it doesn't have to give anything back.

Yeah, looks like I'll be going back to old reliable Node.
