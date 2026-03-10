---
title: "Useful bits for FastHTML"
description: Various dishes
date: 2026-03-06
location: Cambridge, England
topic: Python
---

Some useful bits for [FastHTML](https://fastht.ml) that I picked up.

<section class="notice">

**AMENDMENTS**

09/03/26 - Typo in code example.

</section>

Note that because [FastHTML is based on
Starlette](https://gist.github.com/jph00/e91192e9bdc1640f5421ce3c904f2efb),
these would (with some tweaking) also work for Starlette and other
Starlette-based applications.

### Mock OAuth

This uses the [Beeceptor mock OAuth
service](https://oauth-mock.mock.beeceptor.com).

```python
from fasthtml.common import Button
from fasthtml.oauth import redir_url, _AppClient

import config
from icons import github as github_icon

auth_callback = "/auth/oauth-redirect"

class MockGitHubOAuth():
    def __init__(self, auth_callback):
        self.client = TestGitHubAppClient()
        self.auth_callback = auth_callback

    def login_button(self, request):
        redirect = redir_url(request, self.auth_callback)
        login_link = self.client.login_link(redirect)
        return Button(
            "Sign in with Mock GitHub",
            onclick=f"document.location='{login_link}'",
            type="button",
        )

class TestGitHubAppClient(_AppClient):
    "A `WebApplicationClient` for GitHub oauth2"
    prefix = "https://oauth-mock.mock.beeceptor.com"
    base_url = f"{prefix}/oauth/authorize"
    token_url = f"{prefix}/oauth/token/github"
    info_url = f"{prefix}/userinfo/github"
    id_key = 'id'

    def __init__(self, code=None, scope=None, **kwargs):
        super().__init__('dummy-id', 'dummy-secret', code=code, scope=scope, **kwargs)

auth = GitHubOAuth(auth_callback=auth_callback)
```

You can create your own Mock OAuth service for testing purposes. Tihs is an
exercise left to the reader.

### Rate limiting

You will want to add rate limiting to your application at some point.
This is a very basic rate limiter which gives each IP address a quota
of 100 requests per minute.

```python
from fasthtml import Beforeware
from time import time
from starlette.responses import JSONResponse

# Simple in-memory fixed-window limiter (per IP)
WINDOW_SECONDS = 60
MAX_REQUESTS = 100
requests_store = {}  # {ip: {"window_start": float, "count": int}}

def rate_limit_before(req, sess):
    client_ip = req.client.host
    now = time()

    data = requests_store.get(client_ip, {"window_start": now, "count": 0})

    if now - data["window_start"] >= WINDOW_SECONDS:
        data = {"window_start": now, "count": 0}

    if data["count"] >= MAX_REQUESTS:
        return JSONResponse(
            {"detail": "Rate limit exceeded"},
            status_code=429
        )

    data["count"] += 1
    requests_store[client_ip] = data

rate_limiter = Beforeware(rate_limit_before)
```

You may want to persist this somewhere, or add a limiter busting function
that an admin can press to reset a user's quota. This is an exercise left
to the reader.

### Separation of routes with APIRoute

This bit is essential. If you want to part out your routes into a `routes/`
directory, you will need to create an APIRoute object that can create routes
and can then attach them to the FastHTML object while still preserving
beforeware and exception handlers.

```python
# health_route.py
from fasthtml import APIRouter

import database

health_app = APIRouter(prefix="/health")

@health_app.get("/")
async def get_health():
    return {"database": ("ok" if database.is_alive() else "error")}
```

```python
# main.py
from fasthtml.common import FastHTML
import uvicorn

from health_route import health_app

app = FastHTML()
health_app.to_app(app)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)
```

I tried setting up individual `FastHTML` objects for each route (and you
can attach them via the `routes` argument in the constructor), but this
**does not cascade beforeware or exceptions down to those routes** and
is not recommended. Use APIRouter.

### ORMs vs raw SQL

I can see both sides of this argument. I've lost countless hours trying
to get [Alembic](https://alembic.sqlalchemy.org/en/latest/) to work. I've also
lost countless hours dealing with reams of SQL queries when I really should have
been able to update one column in a model and that change propagated to the rest
of the suite.

I'm settling on [SQLModel](https://sqlmodel.tiangolo.com/). I like it, because
it's less code for me to write, and therefore less for me to test. Some
developers prefer to keep their Models and SQLModels separate because there are
cases where you don't want to return absolutely everything.

```python
from datetime import datetime

from sqlmodel import Field, SQLModel

import database

class User(SQLModel, table=True):
    id:            int      | None = Field(default=None, primary_key=True, index=True)
    is_active:     bool
    gh_login:      str
    gh_created_at: datetime
    creation_date: datetime | None = Field(default=datetime.now())
    last_login:    datetime | None = Field(default=datetime.now())

new_user = User(
    gh_login="foo",
    is_active=True,
    gh_created_at=datetime.now()
)

with database.connect() as session:
    session.add(new_user)
    session.commit()
```

See how this is easier than a rat's nest of SQL queries attached to a
NamedTuple or DataClass?

I'm still not sold on Alembic. I found it a bit of a pain to set up, and
it seems like one of those things where you burn a few hours to automate a few
seconds of effort. [fastmigrate](https://github.com/AnswerDotAI/fastmigrate)
looks a nice middle ground, but this is the subject of another post at another
time.
