---
title: "2025's Spring Potpourri"
description: Various dishes
date: 2025-04-17
location: Silicon Fen, England
---

<div class="notice">
    ⚠️ <b>UPDATES</b>

    24/04/2025: Added small bit on using Telegram Bots for service
    notifications.
</div>

Some notes from this fine year's Lent. If you're wondering, I gave up fizzy
drinks for Lent.

![Central Cambridge, 2025](/img/cambridge-march-2025.webp)

### Why should a swe work for someone else?

I had this argument in a pub on [The
Backs](https://en.wikipedia.org/wiki/The_Backs) with someone I know from the
Silicon Fen tech cluster.

> AI will eliminate 90% of software jobs, so it's pointless to retrain as a
> software developer today.

Sure, but what are those "software jobs"? Claude does a pretty good job of code
monkeying, but does it really follow that graduate developers will not be
required in the workplace? And what about the proliferation of "Project Manager"
roles over the past ten years or so?

Most "software jobs" are really "pushing paper" jobs, and no matter how much
businesses tried to eliminate those jobs, others popped up in their place,
because when you think about it, software is thinking, and thinking is still a
human endeavour.

My argument: if a developer can do their jobs in 20% of the time, and AI can
fill-in for a lot of the ancillary functions in a business (so bookkeeping,
writing advertising copy, writing emails to clients), that developer can run a
one person business. Why would he share the profits? If a solo developer can
make a viable £1m/year business, that's a very good living for him. Even a
humbler £100k/year business would not be unliveable. All without writing a
single JIRA ticket.

My experience is that AI, properly used, can turn a junior developer into a
senior developer, because it turns development from a potentially solitary
activity into a [Socratic
dialogue](https://en.wikipedia.org/wiki/Socratic_method) between two developers.

AI might take some junior roles, but it'll free a lot more developers from the
corporate world. I don't think the corporates have caught on yet.

There's this [famous Tech Email from a Google
executive](https://www.techemails.com/p/there-is-a-social-networking-bubble)
where a co-founder bemoaned being behind on the Social Media bubble.

> The Facebook phenomenon creates a real retention problem, I now realize, not
> just because of FB’s direct hiring, but the more insidious effect that everyone
> wants to start the next Facebook or get rich by having a popular fb app. Whether
> fb itself does well or not is hard to predict but it is clear to me that there
> is a social networking bubble of imitations and tag alongs.
>
> -- Sergey Brin, "There is a social networking bubble" memo, 2007

The phrasing is telling: "the more insidious effect". This is where Google
realised it had a problem-- not with Facebook itself, but with its own engineers
deciding that their job fixing a search engine doesn't scratch the itch anymore,
and there are more interesting opportunities elsewhere.

I wonder how many emails like this have been floating around C-Suites the world
over since GPT was unveiled a few years ago?

### The state of the industry

* [InterviewCoder](https://x.com/im_roy_lee/status/1905063484783472859) revealed
the FAANG emperor to have no clothes. Turns out the easy LeetCode cop-out from
lazy hiring managers has an even easier cop-out for people stuck in these
funnels.

* The refrain to the usual complaining about the tech business's hiring
practices is something I hear often: "use your network" and "seek a
recommendation". I'm sad to report that I have been offered recommendations
directly to hiring managers contingent on a payment of some sort.

* [LinkedIn is still absolutely deranged](https://x.com/LinkedInLunat1c). Either
people who spend their time on LinkedIn earnestly thinking it to be productive
are like this, or the language model bots are going rogue. Or maybe LinkedIn is
now mostly a satire of itself. Who knows.

* There's still a lot of screaming from developers who aren't quite accepting
that AI can do 50% of their jobs. It's OK, I was the same. Imagine being freed
from development scut-work and focusing entirely on UX. It's liberating, no?

* Software engineer salaries have been stagnant inside London for two years.
Outside of London, it's closer to five.

### Trying FastHTML for GIS

I tried [FastHTML](https://fastht.ml/) and I like what the developers intended
for it, but couldn't make it work with GIS applications

I get why it's there: most AI developers write exclusively in Python, and aren't
particularly strong JavaScript developers. I'm not that strong in JavaScript,
and modern web application development with its plethora of libraries,
frameworks, metaframeworks, build steps, and everything else on top of that is
daunting. I was waiting for something that did for the front-end what
[FastAPI](https://fastapi.tiangolo.com/) did for the backend, and FastHTML looks
like it does just that.

Like everything, though, it has its operating envelope.
The problem comes when you try to add JavaScript. Here's me trying to add a
[MapLibreGL](https://github.com/maplibre/maplibre-gl-js) to a FastHTML page.

```python
from fasthtml.common import *

app, route = fast_app(
    hdrs=(
        Link(rel='stylesheet', href='https://unpkg.com/maplibre-gl@^5.1.0/dist/maplibre-gl.css'),
        Script(src='https://unpkg.com/maplibre-gl@^5.1.0/dist/maplibre-gl.js'),
        Style('''
            #map {
                height: 800px;
            }
            [role=button],button,input[type=button],input[type=reset],input[type=submit]{
                --background-color: none;
                --border-color: none;
                padding: 0px 0px;
            }

            [role=button]:is([aria-current],:hover,:active,:focus),button:is([aria-current],:hover,:active,:focus),input[type=button]:is([aria-current],:hover,:active,:focus),input[type=reset]:is([aria-current],:hover,:active,:focus),input[type=submit]:is([aria-current],:hover,:active,:focus){
                --background-color: none;
                --border-color: none;
            }
        ''')
    )
)

@route("/features")
def get():
    return {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              0.12774102787605557,
              52.193469765267764
            ],
            "type": "Point"
          }
        }
      ]
    }

@route("/")
def get():
    map = Div(id="map")
    script = Script(f"""
        const style = {{
            "version": 8,
            "sources": {{
                "osm": {{
                    "type": "raster",
                    "tiles": ["https://a.tile.openstreetmap.org/{{z}}/{{x}}/{{y}}.png"],
                    "tileSize": 256,
                    "attribution": "&copy; OpenStreetMap Contributors",
                    "maxzoom": 19
                }}
            }},
            "layers": [
                {{
                    "id": "osm",
                    "type": "raster",
                    "source": "osm" // This must match the source key above
                }}
            ]
        }};
        const map = new maplibregl.Map({{
            container: 'map', // container id
            style: style,
            center: [0.127, 52.193], // starting position [lng, lat]
            zoom: 14 // starting zoom
        }});

        map.on('load', () => {{
            map.addSource('GeoJSON', {{
                'type' : 'geojson',
                data: 'http://localhost:5001/features'
            }});
            map.addLayer({{
                id: 'geojson',
                type: 'fill',
                source: 'GeoJSON',
                paint: {{
                    'fill-color': 'blue',
                    'fill-opacity': 0.5
                }},
            }});
            map.addControl(new maplibregl.NavigationControl());
        }});
    """)
    return Titled("FastHTML and MapLibreGL", map, script)

if __name__ == '__main__':
    serve()
```

Good luck maintaining client code written like this!

I'm *sure* there are better ways to write FastHTML code, but to be blunt, there
comes a time when the simplicity in one respect unveils complexity elsewhere,
and FastHTML's point in this respect is the introduction of client code.

If I get time, I'll polish my `FastHTML-GIS` library, which allows this:

```python
@route("/")
def get():
    sources = {
        "osm": {
            "type": "raster",
            "tiles": ["https://a.tile.openstreetmap.org/{{z}}/{{x}}/{{y}}.png"],
            "tileSize": 256,
            "attribution": "&copy; OpenStreetMap Contributors",
            "maxzoom": 19
        }
    }
    layers = [
        {
            "id": "osm",
            "type": "raster",
            "source": "osm"
        }
    ]
    return Titled("FastHTML and MapLibreGL", MapLibreGL(id="map", sources, layers)
```

### GitHub's Profile README

> You know what, Stan, if you want me to wear 37 pieces of flair, like your
> pretty boy over there, Brian, why don't you just make the minimum 37 pieces of
> flair?
>
> -- Office Space (1999)

It turns out you might not need a
[LinkTree](https://github.com/MichaelBarney/LinkFree). Just put links on your
Profile README. You can't do too much, as GitHub rightly doesn't allow users to
tinker with the CSS or inject JavaScript, but you can do more than you think.

#### Centering

If you want your headers on your profile README to be centered, just add an
`align` property to your `<h1>` tag, as in:

```html
<h1 align="center">joefg</h1>
```

If you like having some [badges](https://github.com/Ileriayo/markdown-badges) on
your README, you can center them by putting them inside a `<div align="center">`
block, like so:

```markdown
<div align="center">

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Lua](https://img.shields.io/badge/lua-%232C2D72.svg?style=for-the-badge&logo=lua&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

</div>
```

#### Nicer Links

You could use Markdown for this:

```markdown
- [📷 Photography](https://example.com)
- [📧 E-Mail](mailto:example@example.com)
```

This would create a list of links, which is OK and easy to use. Suppose you want
a bit more flair and want your links on one line, separated, and centered?

You could use this:

```html
<div align="center">
  <nav>
    <a href="https://example.com">📷 Photography</a> &bull;
    <a href="mailto:example@example.com">📧 E-Mail</a>
  </nav>
</div>
```

We couldn't use any CSS magic so some hardcoded `&bull;` separators are needed,
sadly.

#### Collapsibles

One Markdown trick (which I like to pass onto people if they use GitHub or
GitLab) is making a collapsible section for long-winded skippable paragraphs.

```html
<details>
    <summary>Click to open</summary>
    <p>This is something that is hidden.</p>
</details>
```

### Using Telegram for alerting

The messaging app [Telegram](https://telegram.org) has a pretty sweet trick:
its [Bot API](https://core.telegram.org/bots) is the nicest one I've used. You
can stand up a bot using [Botfather](https://t.me/botfather), and using the
given API key, you can just ping notifications to a chat (user, group, or
channel) with a simple `curl` request.

```sh
#!/usr/bin/env sh

function notify(){
	local id="$1"
	local msg_string="$2"
	local token="$TG_TOKEN"
	local url="https://api.telegram.org/bot$token/sendMessage"
	curl -s -X POST $url -d chat_id=$id -d text="$msg_string"
}

notify "$@"
```

Using this is as simple as:

```sh
TG_TOKEN="<your-token-here>" ./notify "<chat-id>" "<message>"
```

I released some improved helper scripts as
[tg-tools](https://github.com/joefg/tg-tools). All it requires is `sh` and
`curl`. Small enough to copy/paste, but comes with a simple Makefile installer
so you can add them to a container if you want. Just add the repo as a
submodule, then `cd tg-tools; make install` to install.

### Tools

My search for a consistent task runner (started with `trundle` a few years ago
before settling on well-structured `./run` files) may well have born fruit:
[just](https://just.systems/man/en/) looks good, has syntax comparable to `make`
(but no `.PHONY` spam), supports `.env` files out of the box, and looks "just
the ticket".

I'm also appreciating a good IDE more.
[PyCharm](https://www.jetbrains.com/pycharm/) works reasonably well. The tool I
use most often is the
[profiler](https://www.jetbrains.com/pycharm/features/#python-profiler). I love
a souped up `vim` as much as the next hacker, but spending an obscene amount of
time trying to turn an editor into an IDE is time better spent elsewhere.

A few `git` aliases that I've picked up: `git fixup` and `git squash`, which are
wrappers around `git commit --fixup HEAD` and `git commit --squash HEAD`
respectively. Add them with `git config --global alias.fixup "commit --fixup HEAD"`
and `git config --global alias.squash "commit --squash HEAD"`. At the same time,
I'm also trimming the other aliases I use, because I should really use the
longhand form rather than shorthand. `git sh`? What does that do?

### Reads

I took the plunge and bought an e-reader. Ditching the die-hard "all books must
be on parchment" attitude means that I can bring more books with me when I
travel.

I bought a [PocketBook
Color](https://pocketbook.ch/en-ch/catalog/color-e-readers/pocketbook-verse-pro-color-ch)
because it fits all of my e-books, has a colour screen, and doesn't need an
account to use. It also fits quite nicely inside my motorbike jacket.

#### Programming

I spent some time going through [The Debugging
Book](https://www.debuggingbook.org/). Developers should use debuggers more
often. Yes, technically if you follow Test Driven Development like a *good
developer* you won't need to use it unless you're debugging something, but I
like being able to explore the state of a program in execution.

Old, but gold: [Fear Makes You A Worse
Programmer](https://jvns.ca/blog/2014/12/21/fear-makes-you-a-worse-programmer/).
It's true!

Also old but gold: [Laws of Tech: Commoditize Your
Complement](https://gwern.net/complement) explains why tech companies give away
so much as "open source". It's not out of the "kindness of their hearts". It's
so they can sell the complement.

I spend a little time re-reading
[PragProg](https://en.wikipedia.org/wiki/The_Pragmatic_Programmer) every year,
and there's always something new in that book.

#### Non-Programming

Matthew B. Crawford's [Shop Class as
Soulcraft](https://www.amazon.co.uk/Shop-Class-Soulcraft-Inquiry-Value/dp/0143117467)
made me realise that software is closer to a trade than a profession, and I have
been approaching it wrong. When it's all said and done, software developers are
basically tradies with mechanical keyboards and less back pain.

I'm fond of recommending [Marshall Brain's
Manna](https://marshallbrain.com/manna) to people, as a balanced take on
automation and what "work" could look like in the future. Presented are two
futures: one where man works for machine, and another where machine works for
man. I had another read of it, and it hasn't aged a day. In a similar vein:
Dario Amodei's [Machines of Living
Grace](https://darioamodei.com/machines-of-loving-grace) is an antidote to AI
doomerism.

Jack Kerouac's [On The Road](https://en.wikipedia.org/wiki/On_the_Road) was a
surprising recommendation, but I thoroughly enjoyed it. The myth of the entire
manuscript being typed on one long spool of paper is absolutely true. I'd love
to read more Beat Generation authors. I wonder who today's Beat Generation
authors are?

I couldn't put
[Daemon](https://www.amazon.co.uk/Daemon-Daniel-Suarez/dp/1847249612) by Daniel
Suarez down. It's pretty addictive. Sci-Fi written by an engineer actually worth
reading! Its sequel,
[Freedom](https://www.amazon.co.uk/Freedom-Daniel-Suarez-ebook/dp/B004IPQEAS),
is even better. I won't look at biometric authentication systems the same way
ever again though.