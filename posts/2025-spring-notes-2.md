---
title: "2025's Spring Potpourri: Second Serving"
description: Various dishes
date: 2025-05-05
location: Cambridge, England
topic: Work notes
---

Some more notes from the spring. Didn't want to update the previous post,
but some of this is something that I don't want to leave until the Summer Notes.

<img class="centered-img" src="/img/spring-25.webp" width=600/>

### Looking For Growth

I sometimes make appearances at [Looking For
Growth](https://lookingforgrowth.uk/)'s Cambridge chapter. If you're there too,
say hi! I promise I won't bite!

### Open Source should be considered infrastructure

I'm increasingly persuaded that certain open-source projects with an outsize
impact (and which provide a large attack surface) should be funded via a levy of
some kind on their users.

Take `curl` for example. [Twenty billion installations](https://curl.se/). One
stack or buffer overflow attack, and that's potentially twenty billion devices
at risk. I'm sure that the maintainers are fully aware of this possibilty and
have mitigated to the best of their ability, but given if such a vulnerability
was ever found, how quickly would the patch appear?

Here's another example: `ffmpeg`, a tool I use daily. Not networking tooling,
but still used in surprising places. If you're converting video or doing
technical media related work, you may very well run into `ffmpeg`.
Communications tools like Microsoft Teams use it and generate huge value with
it. Which is why it grates somewhat to see corporations take [very demanding
positions related to SLAs](https://trac.ffmpeg.org/ticket/10341#comment:4) for
open-source projects, followed up by [small donations relative to the value
generated](https://x.com/FFmpeg/status/1775178805704888726).

Another example:
[OpenStreetMap](https://www.openstreetmap.org/#map=6/54.91/-3.43), which has
directly provided tremendous value to the GIS business. There's not just the
data, but the tooling to wrangle the data, all documented, and ready to use. A
commercial mapping effort of this scale would cost tens of billions, but thanks
to OpenStreetMap, anyone can include mapping data in their application, from
tiles to features stored in the database.

At the moment all of these examples rely on volunteers, some accepting
donations, and some paid by corporations to work on the project (although this
is a very small percentage granted). This is acceptable for now. Given Open
Source has a [burnout
problem](https://dev.to/sapegin/why-i-quit-open-source-1n2e), it's becoming less
and less attractive to work in. What happens when `curl` volunteers call it a
day? Are there going to be people who can carry on this work? Will there even be
someone to pass the torch to?

I'm unsure of how a Open Source Infrastructure Levy would work in practice, but
I don't think that the present model of allowing corporates to generate value
while not giving that much back will hold long term.

#### Addendum

I'm aware of [sqlite.org](https://sqlite.org/). SQLite is open-source, but [not
open-contribution](https://sqlite.org/copyright.html). It has sponsorship via its
[consortium](https://sqlite.org/consortium.html).

> The SQLite project was started on 2000-05-09. The future is always hard to
> predict, but the intent of the developers is to support SQLite through the
> year 2050. Design decisions are made with that objective in mind.

Listen to the [Richard Hipp
interview](https://corecursive.com/066-sqlite-with-richard-hipp/#the-bus-factor-and-the-consortium)
to see why SQLite will be around for a good while to come.

Such a project doesn't require a levy, because it successfully asked for (and
received funding from) corporations making heavy use of it. This may well be the
model going forwards.

### Full Circle

We've ended up coming full circle as an industry.

First, we build, and in our mania to build as fast as we can, we end up building
complex monoliths and mountains of complexity. This used to be ColdFusion. Today
it's React.

Next, we commoditise. We try to reduce this complexity as much as we can. We
decide to remove what can be removed. "Simplify and add lightness". This used to
be PHP. Today it's HTMX.

Next, we rationalise. We try to integrate libraries into frameworks. Many years
ago this was Ruby on Rails, which combined Ruby with Model-View-Controller
designs. Today this is FastHTML, which combines Python with HTMX to create web
applications which can exist inside one `main.py` file.

Finally, we decide that we should do things properly. We take our rationalist
"everything included" unopinionated stack and give it opinions about layout and
style, because everyone can agree that all developers have poor taste about one
thing or another and instead of a mess of different styles, it's better to just
have one and stick with it. So we start building...

### Light Robotics

I think that the time is coming ripe for light robotics. More homes will want a
small robot component than they will want a full artificial human. I'm sure
Apple is working on such a thing. They seem to "get it". I'm sure Google is too.
The closest I've seen is Tesla's [Optimus](https://www.tesla.com/en_eu/AI), but
like Tesla's earlier iterations, it'll cost a bomb before the mass market ones
appear.

Do you really want Silicon Valley to win again? I don't. Silicon Valley's too
big and bloated. Look at the org charts of the FAANG companies. Google, for
example, employs more HR people than the headcount of my previous two employers
**combined**.

Apple's inclination is to tack something onto iOS, but given iOS's security
model, I'm unsure whether that approach would work. And given what we know about
Google's OS obsession (first Linux, then Android, then ChromeOS, then Fuschia),
they'll make a whole OS when they won't need to.

Regardless of who does what and who wins, light robotics will be a new category
of consumer technology, much like how the iPhone created the modern smartphone,
or how OpenAI begat GPT which showed people that generative AI can indeed be
intuitive.

What it will look like is anyone's guess. My guess is that most kitchens will
have a robot arm of some sort chopping vegetables while the chef stirs the wok.
Or maybe a farm mechanic will wheel a robot arm underneath a stuck tractor to
undo a fuel tank plug so the mechanic can decant the fuel tank to make it easier
to tow.

The commonality of these two scenarios: the software drives the hardware. The
hardware can be commoditised. The software might not be so easy to commoditise.

I have a few ideas which I might be open to sharing to the right people.

### Tools

I decided to stop using `zsh`. It's a very nice shell. It's certainly cleaner
than `bash`, and easier to configure. I'd love to keep it, but maintaining both
a `bash` config and a `zsh` config (which do largely the same thing) is more
cognitive load than I would like. So I'm gritting my teeth and continuing to
use `bash`, even though there are still some
[bashisms](https://mywiki.wooledge.org/Bashism) that prevent `bash` from being
truly POSIX.

Some terminal tools that I found useful:

* `pv`, [pipe viewer](https://www.ivarch.com/programs/pv.shtml). A performant
    pipe monitor. I use it for laborious `dd if=/path/to/file.iso | pv | dd
    of=/dev/whatever` bulk copying tasks. You can also combine it with `dialog`
    to create a TUI.

* [fd](https://github.com/sharkdp/fd) is a nicer `find`. `find` has a few
    problems: it's not case sensitive by default, and it expects you to know the
    directory in which something is to be found, when that may not be the case,
    requiring `find "thing" .` with an inelegant handing `.`. `fd` fixes these
    things.

* [ripgrep](https://github.com/BurntSushi/ripgrep) is a better grep which
    respects `.gitignore` (but doesn't have to). It's pretty quick too. Comes
    with VSCode. I tend to use this over `grep`. It's even quicker to type! `rg`
    vs `grep`.

* [nnn](https://github.com/jarun/nnn) replaced
    [ranger](https://ranger.github.io/) for me. I like terminal file explorers.
    This one is particularly useful. `nnn -T d` is a nicer `du -H`.

I recently finished moving some old `pipenv` and `conda` environments over to
`uv`, and wow am I impressed with `uv`. This is the Python environment manager I
would recommend to use now.

I also like to include [editorconfig](https://editorconfig.org/) files in
repositories I own because I know full well `neovim` isn't the only editor which
edits those files.

<img class="centered-img" src="/img/springtime-2025.webp" width=400/>
