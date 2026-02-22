---
title: "2026's Early Winter Potpourri"
description: Various dishes
date: 2026-02-22
location: Ely, England
topic: Assorted notes
---

Some notes from the winter.

<figure>
    <img class="centered-img" width="400" src="/img/burnt-out-truck.webp"/>
    <br/>
    <figcaption>
        Photo from 22nd February, 2026. Taken near the Fenland
        washes. Vehicle owner unidentified. He has my sympathy.
    </figcaption>
</figure>


## The right to compute

I always suspected that computers (including the one with the modem and touch
screen in your pocket) will one day stop getting better, and will instead start
getting substantially worse with every passing year.

I never thought it would happen so soon and so suddenly.

[This Xeet](https://x.com/forloopcodes/status/2025543929383293415) shows just
how invasive Copilot for Windows really is. I remember the furore when Microsoft
announced it, along with a "recall" "feature" that [takes screenshots every few
seconds](https://www.bbc.co.uk/news/articles/cj3xjrj7v78o). Now it's embedded in
the operating system. Every syscall now involves Copilot to a degree. This is
already here. It's not something from [RMS's Right to
Read](https://www.gnu.org/philosophy/right-to-read.en.html) or [John Walker's
Digital Imprimatur](https://www.fourmilab.ch/documents/digital-imprimatur/).
It's here.

> After they nerf the software, they will need to nerf the hardware.

I think I'll keep using Linux, thanks. I'll start stockpiling my own compute
too, because when everyone's sole interaction with a computer will be through a
single API call, they'll come for the hardware too. After all, there'll be no
need to have a graphics card capable of matrix maths when that'll happen on the
server.

All of the "AI Safety" people know that software restrictions are insufficient:
there will always be the [Analogue
Hole](https://en.wikipedia.org/wiki/Analog_hole). That they don't speak out
about this speaks volumes about their characters, and I am far from
[accelerationist](https://www.science.org/doi/10.1126/science.aeb5789) in this
respect.

> Developer: I want to buy this graphics card.
>
> Shopkeeper: What do you want one of them for? You'll need to fill out a form,
> sir, and someone from the Compute Licensing Team at the Home Office will
> interview you in the next six months before you can take delivery.

I wish I was joking, but I see AI compute being limited in the next three years.
It may be through a licensing regime similar to that [of
shotguns](https://www.gov.uk/find-licences/shotgun-and-firearm-certificates), it
may be under a "voluntary" scheme that prevents people from buying too many
graphics cards, it may be through degraded software performance on
"non-compliant" hardware, it may even be through service providers making their
compute so cheap nobody bother sells graphics cards to the general public, but
my hunch is that it will happen.

## FastAPI performance

It's pretty good as-is, but the most recent update added [Response
Models](https://fastapi.tiangolo.com/tutorial/response-model/). Consider
the following.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

items = [
    Item(name="Portal gun", price=100.0),
    Item(name="Gravity gun", price=250.0)
]

@app.get("/item/{i}")
async def get_item(i: int) -> Item:
    return items[i]

@app.get("/old-item/{i}")
async def oget_item(i: int):
    return items[i]
```

Which one is quicker?

Answer: `get_item`, because the `BaseModel` JSON serialiser is quicker than
the native Python one. In my experience, it halves the response time.

I used to be a Pydantic sceptic until I saw this trick. I'm now sold.

For best results, use
[SQLModel](https://sqlmodel.tiangolo.com/), which is a SQLAlchemy ORM and a
Pydantic model in combination. **You cannot lose!**

## Software is not a spectator sport

I decided to hide my development graph on GitHub. Why?

1. It's no longer a good signal of competence. Anyone can [mess with the
   calendar](https://github.com/gelstudios/gitfiti) to make it look like you're
   a rockstar, even if you can only write To-Do sites (or you're actually a pub
   guitarist who only sings Wonderwall).

2. I'm tired of working for free in the name of "exposure". If you use my stuff,
   great! I do other things with my time, and I'm tired of lending credence to a
   system which evaluates competence by how much of your time you're willing to
   give up. For the average developer, Open Source is a bit of a scam, and by
   making everything open source, you're training your replacement. So don't.

3. It's a half-arsed protest about the loss of expertise that the Vibe Code
   economy created. Nobody's actually expected to know things like RESTful state
   management or what HTTP verbs actually do, because Claude knows that. So why
   show off what Claude can do? My experience is that it's a poor indicator of a
   candidate's abilities. Anyone can regurgitate enough `git` to push a simple
   to-do list app to GitHub. Show me a living product with users, then we can have
   a proper discussion.

## You didn't build that, Claude built that

Controversial opinion: vibe coded stuff should always be committed under the
name of the AI system that created it. You didn't make that. Claude did. By all
means commit your touch-ups, but deciding to commit someone else's work breaks
any accountability that system might have had, and you will be creating an
[accountability
sink](https://gillkernick.substack.com/p/accountability-sinks-and-cries-of)
as a consequence.

I don't care if you vibe code, it's your choice. Just don't create accountabilty
sinks! If your commit really broke something and people (rightly) ask what the
deal is, if you point to your commit and say "oh, Claude did that", you're
telling everyone that they shouldn't trust commits with your name on it.

There's probably a web comic to be had here. The quickest way to stop developers
from vibe coding everything is if they had to put the agent's name on the
commit's author section.

## Cache and Carry

I use the `@cache` and `@lru_cache` decorators a lot in prod services. It's a
cheap way of caching in Python, and tends to work. That said:

1. Be careful what you cache. **Never cache authentication or authenticated
   content**.

2. Be careful of how the cache gets invalidated. `@cache` never clears the
   cache. `@lru_cache` bins the least recently used cached item, requiring that
   nobody wants to access that content. Consider other caching methods. I would
   add another caching policy: clear it every `t` minutes, or add an event-driven
   cache buster. Implementation of this is left to you, dear reader.

I find myself reaching for fast.ai's
[flexicache](https://daniel.feldroy.com/posts/2025-05-flexicache), or something
similar in [cachetools](https://cachetools.readthedocs.io/en/stable/).

Tempted to release my own implmentation at some point. This is a good interview
question for Python backend positions.

## Ordnance Survey Open Data

The [Open Data](https://osdatahub.os.uk/data/downloads/open) is pretty good. My
recommendation is to download and store in
[GeoPackage](https://www.geopackage.org/) format, which
[GDAL](https://gdal.org/en/stable/) supports natively.

Don't forget to cite it under the
[OGL](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/")!

I use this quite a lot, and I find it easier to work with than the [Open
Geography Portal](https://geoportal.statistics.gov.uk/).

## LinkedIn is still terrible

I don't like it, and somehow it's worse. I used to tolerate it because "everyone
else is on it" (and the minigames were actually pretty fun), but I can't bear it
now. The LinkedIn "thinkpieces" with a particular writing style used to just
stay there, with no crossover into X. Now X is as bad. I blame LinkedIn.

LinkedIn has two main value areas: tracking a person's professional network (and
it belongs to the person, not their employer, not LinkedIn), and matching people
with job postings that might be more relevant to them. It fails to do both these
days. So why keep it?

LinkedIn's sins: Algorithmic incentivising quick form content for quick likes
and shares. Mixing synthetic content with human output. Encouraging mutual
engagement resulting in sharing rings. Encouraging users to overshare aspects of
their personal lives. Encouraging users to build a brand rather than letting an
identity emerge authentically.

> I use LinkedIn because everyone else uses LinkedIn. Everyone else uses
> LinkedIn because everyone else uses LinkedIn. Nobody likes LinkedIn.

Sadly, the first person to defect from this does not stand to gain much at all.
Everybody is too weak to defect in a collective, so the cycle continues.
