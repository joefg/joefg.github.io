---
title: "2025's Christmas Potpourri"
description: Various dishes
date: 2025-12-22
location: West Norfolk, England
topic: Assorted notes
---

'Tis the season, and before I stuff my face with mince pies, I'll share some
stuff from my little notebook.

### How to make tmux behave under dark mode

I can't believe it took me this long to figure out!

```
# statusbar
set -g status-style 'bg=default fg=default'

# window dressing
setw -g window-status-format "#[fg=green]#I#F #[fg=default]#W"
setw -g window-status-current-format "#[fg=green]#I#F #[fg=default,bold,underscore]#W"
set -wg mode-style 'bg=default,fg=default'

# pane style
set -g pane-border-style 'fg=default'
set -g pane-active-border-style 'fg=green'
```

`tmux` respects the default background and foreground colours of whatever
terminal you're using. If you're using [ghostty](https://ghostty.org) like I am,
you can configure it to respect light and dark mode in the operating system.

```
theme = dark:Tomorrow Night,light:Tomorrow
```

Changing light/dark mode automatically refreshes the terminal to reflect this,
as a bonus also changing the colour palette of your favourite editor,
[neovim](https://neovim.io). Neat!

### Agents

I'm using [goose](https://block.github.io/goose/) now. I find that it's
better than claude-code. I like the per-project `.goosehint` mechanism, because
it helps to avoid Claude's habit of peppering `useEffect` functions where they aren't
needed.

One perk of having access to a beefy workstation is that I can run some models
locally. I find that [Devstral2 Mini](https://mistral.ai/news/devstral-2-vibe-cli) works
rather well for what I use it for.

```
joefg@camel:/dev/shm$ neofetch
            .-/+oossssoo+/-.               joefg@camel
        `:+ssssssssssssssssss+:`           -----------
      -+ssssssssssssssssssyyssss+-         OS: Ubuntu 24.04.3 LTS x86_64
    .ossssssssssssssssssdMMMNysssso.       Host: Precision 3460
   /ssssssssssshdmmNNmmyNMMMMhssssss/      Kernel: 6.8.0-90-generic
  +ssssssssshmydMMMMMMMNddddyssssssss+     Uptime: 6 hours, 5 mins
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Packages: 1053 (dpkg), 4 (snap)
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Shell: bash 5.2.21
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Terminal: /dev/pts/0
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   CPU: 12th Gen Intel i7-12700 (20) @ 4.800GHz
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   GPU: Intel AlderLake-S GT1
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   GPU: NVIDIA RTX 2000 Ada Generation
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Memory: 1072MiB / 31782MiB
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/
  +sssssssssdmydMMMMMMMMddddyssssssss+
   /ssssssssssshdmNNNNmyNMMMMhssssss/
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        `:+ssssssssssssssssss+:`
            .-/+oossssoo+/-.

joefg@camel:/dev/shm$
```

I got a really good deal on that workstation, considering today's absolutely
bananas RAM and GPU prices. If it's odd that developers spend money on beefy
computers, then the practice of tradesmen spending more on quality tools is no
less odd. I'd rather keep compute locally. Besides, on a good day, this
workstation is powered by solar, making it carbon-neutral in operation.

### Tailscale

I started to use [tailscale](https://tailscale.com) as something with which to
access various bits of infrastructure.

I no longer have to expose SSH on prod services, because tailscale can take
over that port and restrict it to a group of users on the tailnet. Sweet!

### FastHTML tips

Now that I run some FastHTML in prod, some tips:

1. Use a migration tool, test locally before deploy. `fastmigrate` is pretty good.

2. `@lru_cache` is a godsend when you have a function which gets absolutely
   hammered.

Consider the following:

```python
def residences_in_postcode(postcode: str):
    sql = '''
        select *
        from residences
        where postcode = :postcode;
    '''
    conn, cur = db.connect()
    cur.execute(sql, params={'postcode': postcode})
    return cur.fetchall()

residences_in_postcode('BS4 1DQ')  # Database query 
residences_in_postcode('IP30 2WC') # Database query 
residences_in_postcode('BS4 1DQ')  # Database query 
```

This has the potential to be a very expensive function, even with indexing. So
why not cache?

```python
from functools import lru_cache

@lru_cache(32)
def residences_in_postcode(postcode: str):
    sql = '''
        select *
        from residences
        where postcode = :postcode;
    '''
    conn, cur = db.connect()
    cur.execute(sql, params={'postcode': postcode})
    return cur.fetchall()

residences_in_postcode('BS4 1DQ')  # Miss, database lookup, add to cache
residences_in_postcode('IP30 2WC') # Miss, database lookup, add to cache
residences_in_postcode('BS4 1DQ')  # Hit, fetch result from cache
```

The LRU cache stores the last N recently used arguments with the results, and
if a request has those arguments, it just returns a cached value, in this case
saving a lookup to the database. Just remember to invalidate the cache with `.cache_clear()`
when the database changes.

3. Don't forget your indexes. Index your database on the most frequently used
joining and query columns!

4. Generators are good to use as well. If you're serving a lot of geographic
features, do you really want to be gathering everything, loading it into a singular GeoJson,
then giving it to the client? Make it a generator that returns a stream of GeoJSONs as part of
a [GeoJSONL](https://www.interline.io/blog/geojsonl-extracts/) output, for the client to consume
one line at a time.

Simply:

```python
def residences_in_postcode(postcode: str):
    sql = '''
        select *
        from residences
        where postcode = :postcode;
    '''
    conn, cur = db.connect()
    cur.execute(sql, params={'postcode': postcode})
    while True:
        rows = cursor.fetchmany(50) # or however many
        if not rows: break
        for row in rows: yield jsonify(row) # bring your own jsonify

@app.get('/stream')
async def strm(postcode: str):
    gen = residences_in_postcode(postcode)
    return StreamingResponse(gen())
```

4. Put the application behind a reverse proxy. I use
[Caddy as a reverse proxy](https://caddyserver.com/docs/quick-starts/reverse-proxy), which provisions
a certificate for you (although it may be beneficial to sort your own certificate out).
I don't care what the docs suggest, never expose uvicorn to the outside world!

### A book that blew my mind

An anon on 𝕏 recommended a book: Marshall McLuhan's "War and Peace in the Global Village".

> “One thing about which fish know exactly nothing is water, since they have no
> anti-environment which would enable them to perceive the element they live in.
> It appears that they can hear pretty well but have scarcely any power of
> directional location for the origin of the sounds they hear. In some species they
> discharge electric shocks as a means of spatial orientation, much as bats use their
> high-pitched squeaks as the equivalent of flashlights. What fish are able to see
> bears a close analogy to that degree of awareness which all people have in
> relation to any new environment created by a new technology—just about zero.
> Yet despite a very limited sensory life, the fish has an essence or built-in
> potential which eliminates all problems from its universe. It is always a fish and
> always manages to continue to be a fish while it exists at all. Such is not, by any
> means, the case with man.”
> 
> Marshall McLuhan, War and Peace in the Global Village

I ordered a copy, and it's amazing how prescient this man was. While the term
"internet" and "social media" wasn't a thing when he wrote this book, he
understood that a connected world brings people closer together, *for better and
for worse*. Even now, he's still many years ahead of us.
