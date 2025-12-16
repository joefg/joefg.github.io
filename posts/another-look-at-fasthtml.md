---
title: "Another look at FastHTML"
description: Second stab.
date: 2025-05-24
location: Ely, England
topic: Python
---

I decided to have another look at [FastHTML](https://fastht.ml).

> TL;DR It could be a contender for the Solo Developer Stack provided that
> the developer is aware of a few sharp corners.


### What I like

It's genuinely very, very simple. If you can write HTML you can write a web
application with FastHTML.

It's also very unopinionated. Sure, you're locked into HTMX (for better or
worse), but it doesn't try to enforce its own opinions like many of the big
JavaScript frameworks do.

It's still very new, but there's already a [burgeoning
ecosystem](https://github.com/amosgyamfi/awesome-fasthtml/tree/master)
surrounding it.

It contains batteries, such as an [OAuth
handler](https://fastht.ml/docs/explains/oauth.html) and a [Railway
handler](https://fastht.ml/docs/api/cli.html).

It may not be as "complete" as something like Ruby on Rails or Django, but it
doesn't compete with either of those. Think of it as a bigger
[flask](https://flask.palletsprojects.com/en/stable/), which fills the "zero to
one" niche quite nicely.

I also like that it doesn't try to reinvent asynchronous code. It uses `asyncio`
and `async/await` **just fine**, avoiding using older libraries like Twisted.

I also find the [Jupyter compatibility](https://fastht.ml/docs/api/jupyter.html)
very interesting. It reveals the target audience: AI developers who spend more
time in notebooks than in an IDE.

### What I don't like, and how I would improve it

It's a bit ugly in parts.

There are a lot of brackets, and the conventions used in the documentations are
not to my taste.

```python
from fasthtml.common import *

app, rt = fast_app()

@rt("/")
def get():
    return Titled("FastHTML", P("Let's do this!"))

serve()
```

I would rather do this:

```python
from fasthtml.common import *

app, route = fast_app()

@route("/")
def get():
    return Titled("FastHTML", P("Let's do this!"))

if __name__ == '__main__':
    serve()
```

I would also use a model-view-controller structure.

```python
from fasthtml.common import *

# This could go into a models.py, or into a models/ directory.
def home_page_model(words):
    return words.upper()

# This could go into a views.py, or into a views/ directory.
def home_page_view(words):
    words = home_page_model(words)
    return Titled("FastHTML", P(words))

app, route = fast_app()

# You can think of this bit as being the controller.
@route("/")
def get():
    return home_page_view("Let's do this!")

if __name__ == '__main__':
    serve()
```

This grants you the usual benefits of a model-view-controller structure: you can
unit test the model, integration test the view, and end-to-end test the overall
application.

### What it could benefit from

I like SQLite, but I'm still not convinced about using it as a prod data store
on a web service. I know you just enable the WAL and it can handle things
reasonably well, but there's no authentication, and backups aren't streamed (if
they're backed up at all). I'd like to see support for
[pyodbc](https://pypi.org/project/pyodbc/) at some point, using similar syntax
to the built-in SQLite utility.

I'd also like to see discussion about reverse proxies in the documentation. I
think they're worth it for security and logging reasons. It's additional
complexity, sure-- but seeing a Python server running allowing input from the
outside world without the ability to filter at short notice worries me slightly.

I would like to see discussion of environment variables in the
documentation too. They're very important, and they are the standard way to pass
secrets into the runtime, especially when OAuth is concerned.

### Who could it benefit

Right now, a lot of people think that all web applications require a JavaScript
front-end, usually written in React or Vue, orchestrated by Vite, and using
something like Cypress or Playwright to end-to-end test it.

This is fine, and you can produce excellent work using that stack. **But**, and
it's a big but: what if you don't know it already? Not everyone is a front-end
developer. Not everyone can (or indeed wants) to work full-stack when the stack
becomes this complex.

Personally, I think it has a niche: people taking a scientific compute product
and wanting to build a wrapper around it as quickly as possible so they can
ship fast and iterate quickly. AI developers, in other words.

I interviewed for a company building an AI tool for managing ███ ███████, and
one of the things that struck me was how complex the stack actually was when it
didn't have to be. They were looking to add a senior engineer who could work
across this stack. My suggestion was that React was too heavy for their use
case, and they could use something like HTMX and Alpine to handle reactivity
instead, keeping the state on the server. I wish I knew about FastHTML then!

My opinion is that while this might not get you 100% of the way there in a
project, it's quick enough and simple enough to get you 90% of the way there,
and leaves you in a good enough state to go from there. Compare to the usual
React/FastAPI/PostgreSQL stack, which requires a day to even scaffold and get a
rudimentary deploy running. If I was a solo developer building a web product, I
know which one I'd rather use.
