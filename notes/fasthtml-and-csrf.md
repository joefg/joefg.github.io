---
title: "FastHTML and CSRF Tokens"
description: Securing your web app
date: 2026-09-23
topic: Python
---

<article>

**UPDATES**

23/09/26

- Small errata on code examples.

- Explain where to use CSRF tokens. (Thanks, Rob!)

- Briefly explain Sec-Fetch-Site. (Thanks, Rob!)

</article>

A [Cross Site Request Forgery](https://community.owasp.org/attacks/csrf) attack
is where a hostile website is able to make requests to another website
using the user's cookies to perform actions as that user without that user's
knowledge or consent. It's a long-standing issue in web development, and
many frameworks shield against it by one of the following:

1. Setting a token and putting that token in a form on the website. The
hostile site can't make requests without that token, and it can't access
that token. This token is checked on the back-end and compared to a token
set locally, which the hostile site also can't access.

2. Setting the token in a header from the website. Like the above option,
the hostile website can't see this header so cannot use it.

FastHTML's documentation doesn't describe how to do this, so here's how
I do it.

### Setting the token

Suppose you have a login route, `"/login".`For the sake of this exercise
let's assume you have a Users model and can handle authentication through
the model, along with a Home page defined somewhere.

```python
from app.pages import Home

@route("/login")
def post(request, session, username, password):
  user = users_model.find_user(username)
  if not user: raise Exception("User not registered.")
  if not user.validate_password(password): raise Exception("Incorrect password.")
  else:
    session.auth["user"] = user.id
    return redirect("/home")
```

We want to add a CSRF token. We can do that by generating a random token and attaching
it to the session.

```python
from app.pages import Home
from secrets import token_hex

@route("/login")
def post(request, session, username, password):
  user = users_model.find_user(username)
  if not user: raise Exception("User not registered.")
  if not user.validate_password(password): raise Exception("Incorrect password.")
  else:
    session.auth["user"] = user.id
    session.auth["csrf_token"] = token_hex(16)
    return Home()
```

Note that this attaches it to the FastHTML session, which is stored in browser but
can be accessed through the server. This is kept in the local storage of the browser,
but it is not sufficient to prevent CSRF attacks because a third party site can still
send requests to your site using the session. You want to attach something to the page
document itself and verify that. You can attach it in two places:

1. Every input form which calls something that verifies the token;
2. HTMX allows [headers on the body object](https://htmx.org/docs/#csrf-prevention) which
cascade down to the element making the request.

I prefer using HTMX to make requests, so let's use option 2.

```python
import json
from secrets import token_hex

from app.pages import Home

@route("/login")
def post(request, session, username, password):
  user = users_model.find_user(username)
  if not user: raise Exception("User not registered.")
  if not user.validate_password(password): raise Exception("Incorrect password.")
  else:
    csrf_token = token_hex(16)
    session.auth["user"] = user.id
    session.auth["csrf_token"] = csrf_token
    htmx_headers = json.dumps({"x-csrf-token": csrf_token})
    return Home(hx_headers=htmx_headers)
```

### Using the token

Recall that the token is kept with the main `html` element as part of
`hx-headers`, under `x-csrf-token`. The magic of HTMX allows any
child element to use that token in the header of any request a HTMX element
can make.

This, at least, verifies that the request came from our document, and not
somebody else's.

Let's suppose you have a route which allows a mutable operation to happen
on the site. Let's call it "ban_user", which allows an administrator to
ban a user. It's on an administration page somewhere and is attached to
a input box with a "ban user" button on it. The details here are irrelevant,
it's an HTMX input box, and as such has this token attached to it.

```python
@route("/ban-user")
def post(request, session, user_to_ban):
    current_user_id = session.auth["id"]
    is_admin = users_model.find_user_by_id(current_user_id).is_admin

    if not is_admin:
        raise Exception("Unauthorised.")
    else:
        user = users_model.find_user(username)
        if not user: raise Exception("User not found.")
        else:
            user.disable()
            return "User banned"
```

We want a CSRF token. HTMX has already sent it in the request headers, so
we can access it using `request.headers['x-csrf-token']`.

```python
@route("/ban-user")
def post(request, session, user_to_ban):
    has_csrf_token = request.headers['x-csrf-token'] == session['csrf_token']
    if not has_csrf_token: raise Exception("Unauthorised")

    current_user_id = session.auth["id"]
    is_admin = users_model.find_user_by_id(current_user_id).is_admin

    if not is_admin: raise Exception("Unauthorised.")
    else:
        user = users_model.find_user(username)
        if not user: raise Exception("User not found.")
        else:
            user.disable()
            return "User banned"
```

### Testing

If we're using Starlette's `TestClient` (and we should!), we cannot send
requests from the document as the document requires JavaScript to have
executed.

```python
from starlette.testclient import TestClient

def mock_admin_auth(client: TestClient):
    client.post("/login") # logs in as test user
    return client

def test_csrf_token():
    ts = TestClient()
    ts = mock_admin_auth(ts)
    ts.post("/ban-user", {"username": "other_user"})
    assert ts.status == 200
```

This won't work because the TestClient isn't sending requests with HTMX, and as such doesn't
have that header. You will want to extract the set header from the HTML document and
send that. We can do that with [lxml](https://lxml.de).

```python
import json
from starlette.testclient import TestClient
import lxml

def extract_hx_hdr(html: str):
    html_tag = lx.fromstring(html).xpath('/html')[0]
    assert 'hx-headers' in html_tag.attrib
    hx_hdr = html_tag.xpath('/html')[0].attrib['hx-headers']
    return json.loads(hx_hdr)

def mock_admin_auth(client: TestClient):
    client.post("/login") # logs in as test user
    return client

def test_csrf_token():
    ts = TestClient()
    ts = mock_admin_auth(ts)
    hx_hdr = extract_hx_hdr(ts.response)

    ts.post("/ban-user",
        {"username": "other_user"},
        headers=hx_hdr
    )
    assert ts.status == 200
```

Done!

It's worth pointing out that there are other ways to handle CSRF tokens, but
this is one I have found to work. Most other web frameworks do this for you,
I think there is a case for FastHTML to do it for you too, but until that happens,
you need to roll it yourself.

### Postscript

#### Where to put CSRF protection

Usual practice is to apply CSRF protection on routes which alter the state of
the website, mainly `POST`, `PUT`, `PATCH`, and `DELETE` operations.

However, consider the following: CSRF affects `GET` requests too. The page can't
see the output because of the [Same Origin
Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy),
but the action has still taken place.

Suppose you have something on your web service that locks up the rest of the
service, like a dashboard or something that makes a really big `SELECT` against
a database. If an attacker requests that resource by putting it in an
`<img>` tag on his site, that request is still made, tying up the web
service for every other user.

#### Other mitigations

There are other ways of protecting against CSRF attacks. One is the
`Sec-Fetch-Site` header. Setting it to `same-site`, which can't be set via
JavaScript.

The thinking is that just checking this header should be sufficient. The
request can't be tinkered with by an attacking site through JavaScript as
this header is set by the browser.

The standard was formalised and all browsers after 2023 should
use it.

In theory at least, all you would need to do check for `sec-fetch-site`
in your request headers.

```python
def same_origin(request):
    return 'Sec-Fetch-Site' in request.headers \
        and request.headers['Sec-Fetch-Site'] == "same-origin"

@route("/ban-user")
def post(request, session, user_to_ban):
    if not same_origin(request): raise Exception("Unauthorised")

    current_user_id = session.auth["id"]
    is_admin = users_model.find_user_by_id(current_user_id).is_admin

    if not is_admin: raise Exception("Unauthorised.")
    else:
        user = users_model.find_user(username)
        if not user: raise Exception("User not found.")
        else:
            user.disable()
            return "User banned"
```

If you're very flash, you could implement this as a decorator.

```python
def same_origin(request):
    return 'Sec-Fetch-Site' in request.headers \
        and request.headers['Sec-Fetch-Site'] == "same-origin"

def require_same_origin(func):
    @wraps(func)
    async def wrapper(request, session, *args, **kwargs):
        if not same_origin(request):
            raise HTTPException(status_code=403)
        return await func(request, session, *args, **kwargs)
    return wrapper

@require_same_origin
@route("/ban-user")
def post(request, session, user_to_ban):
    current_user_id = session.auth["id"]
    is_admin = users_model.find_user_by_id(current_user_id).is_admin
    if not is_admin: raise Exception("Unauthorised.")
    else:
        user = users_model.find_user(username)
        if not user: raise Exception("User not found.")
        else:
            user.disable()
            return "User banned"
```

If backwards compatability isn't a large concern this could be the way to go.
