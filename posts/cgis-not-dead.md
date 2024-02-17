---
title: CGI's not dead, I wrote some yesterday
description: Build like it's 1999 with CGI
date: 2023-04-01
---

> The past is a different place; they do things differently there.

Build like it's 1999 with Common Gateway Interface scripts!

It's also a great learning experience. Learn the [HTTP specification](https://www.ietf.org/rfc/rfc2616.txt) by implementing it!

## Old School

The humble [Common Gateway Interface](https://www.rfc-editor.org/rfc/rfc3875) was the first stab at making dynamic web pages. It represents a standardised way for a web server to pass request information to a program such that the program can interpret the request and build a response, using operating system primitives.

```
+---------+  request   +--------+  stdin   +---------+
| Browser | ---------> | Server | -------> | Program |
|         | <--------- |        | <------- |         |
+---------+  response  +--------+  stdout  +---------+
             (stdout)      |       stderr
                    errors |
                   (stderr)|    +----------+
                           +--> | Error    |
                                | Logs     |
                                +----------+
```

Request goes into the program via `stdin`, and the output to be passed to the server is returned by `stdout`, with errors put into `stderr` going into the logs.

Even though it's old, it is [still in Python's standard libary](https://docs.python.org/3/library/cgi.html), albeit for not much longer. As long as your script can read `os.environ['QUERY_STRING']` or the equivalent in your programming language from the environment variables, it'll work, and as long as it can return a string to the web server, it'll work. The `cgi` library is a helpful abstraction in most cases.

The execution model is very simple: one process per HTTP request. In this way, it's possible to have very cheap isolation of database connections, provided you don't mind plenty of database connections being spawned under high load. [The operating system does a lot for you anyway](http://z505.com/cgi-bin/qkcont/qkcont.cgi?p=Myths%20About%20CGI%20Scalability).

`CGI` is incredibly portable. Every wondered why some consumer routers have `.cgi` in the URLs of the various admin pages that they use? That is a `CGI` script. The set-and-forget devices are optimised to use as few libraries as possible, and what is simpler than `stdin`, `stdout`, and `stderr`?

Here's an example `CGI` script for `bash`.

```bash
#!/usr/bin/env bash

function content_type() {
	case $1 in
		'plain')
			printf "Content-Type: text/plain\n"
			;;
		'json')
			printf "Content-Type: application/json\n"
			;;
		'html')
			printf "Content-Type: text/html\n"
			;;
		*)
			printf "Content-Type: text/plain\n"
			;;
	esac
}

function status() {
	case $1 in
		'200')
			printf "200 OK\n"
			;;
		'400')
			printf "400 Bad Request\n"
			;;
		'401')
			printf "401 Unauthorised\n"
			;;
		'403')
			printf "403 Forbidden\n"
			;;
		'404')
			printf "404 Not Found\n"
			;;
		'418')
			printf "418 I'm a teapot\n"
			;;
		'451')
			printf "451 Unavailable For Legal Reasons\n"
			;;
		'500')
			printf "500 Internal Server Error\n"
			;;
		*)
			printf "200 OK\n"
			;;
	esac
}

function headers() {
	status $1
	content_type $2
	printf "\n"
}

headers 200 text
env
```

What can be simpler than that?

## Footguns

The downside to `CGI`'s flexibility is how easy it is to footgun yourself with `CGI`.

1. It's very easy to misconfigure something. Forgot to set `chmod +x`? That `CGI` script is now a file ready to download. It is possible to set your webserver to not serve files ending with a filetype or in a directory if they're not executable, but this is an additional step, not the default. It's easy to accidentally expose secrets this way if you're lazy and put hardcoded credentials in your scripts.

2. You have to aggressively filter what goes in the script. Most frameworks do this by default, but not `CGI`, not in the land of `stdin/stdout/stderr`. This is one of the reasons why web frameworks eventually superseded `CGI` in production usage.

3. One process per HTTP request. Memory leaks are made substantially worse under load. Freeing up memory involves blindly `kill -9` on lots of HTTP requests.

Most of this can be boiled down to system administration headaches. `CGI` development requires some faculty with system administration and system administration tools. It is for this reason I don't recommend it for production web server usage unless you are able to keep the system very simple and are able to spend plenty of time tightening up inputs from the web client.

## What I Use It For

I use it for prototyping, mostly because it's very simple and it lets me build out core functionality before worrying about technical details too much. I have a simple Python wrapper around `cgi` and `sqlite` that allows me to do this.

The structure I use looks like this:

```
├── index.html
├── index.js
├── index.css
├── data/
│   └── database.db
└── cgi-bin
    ├── helper.py
    ├── login.py
    ├── logout.py
    └── function.py
```

I can use the following helper functions to create an endpoint.

```python
import os
import sys

import http.cookies
import sqlite3

content = {
    'json': 'Content-Type: application/json;\n',
    'text': 'Content-Type: text/plain;\n',
    'html': 'Content-Type: text/html;\n'
}

responses = {
    'continue':                       '100 Continue',
    'switching-protocols':            '101 Switching Protocols',
    'processing':                     '102 Processing',
    'ok':                             '200 OK',
    'created':                        '201 Created',
    'accepted':                       '202 Accepted',
    'non-authoritative':              '203 Non-Authoritative Information',
    'no-content':                     '204 No Content',
    'reset-content':                  '205 Reset Content',
    'partial-content':                '206 Partial Content',
    'multi-status':                   '207 Multi-Status',
    'already-reported':               '205 Already Reported',
    'im-used':                        '205 IM Used',
    'multiple-choices':               '300 Multiple Choices',
    'permanently-moved':              '301 Moved Permanently',
    'found':                          '302 Found',
    'see-other':                      '303 See Other',
    'not_modified':                   '304 Not Modified',
    'use-proxy':                      '305 Use Proxy',
    'temporary-redirect':             '307 Temporary Redirect',
    'permanant-redirect':             '308 Permanent Redirect',
    'bad-request':                    '400 Bad Request',
    'unauthorised':                   '401 Unauthorized',
    'payment-required':               '402 Payment Required',
    'forbidden':                      '403 Forbidden',
    'not-found':                      '404 Not Found',
    'method-not-allowed':             '405 Method Not Allowed',
    'not-acceptable':                 '406 Not Acceptable',
    'proxy-auth-needed':              '407 Proxy Authentication Required',
    'timeout':                        '408 Request Timeout',
    'conflict':                       '409 Conflict',
    'gone':                           '410 Gone',
    'length-required':                '411 Length Required',
    'precondition-failed':            '412 Precondition Failed',
    'payload-too-large':              '413 Payload Too Large',
    'request-uri-too-long':           '414 Request-URI Too Long',
    'unsupported-media-type':         '415 Unsupported Media Type',
    'range-not-satisfiable':          '416 Requested Range Not Satisfiable',
    'expectation-failed':             '417 Expectation Failed',
    'teapot':                         '418 I\'m a teapot',
    'misdirected':                    '421 Misdirected Request',
    'unprocessable':                  '422 Unprocessable Entity',
    'locked':                         '423 Locked',
    'failed-dependency':              '424 Failed Dependency',
    'upgrade-required':               '426 Upgrade Required',
    'precondition-required':          '428 Precondition Required',
    'too-many-requests':              '429 Too Many Requests',
    'fields-too-large':               '431 Request Header Fields Too Large',
    'connection-closed':              '444 Connection Closed Without Response',
    'censorship':                     '451 Unavailable For Legal Reasons',
    'client-closed':                  '499 Client Closed Request',
    'internal-error':                 '500 Internal Server Error',
    'not-implemented':                '501 Not Implemented',
    'bad-gateway':                    '502 Bad Gateway',
    'service-unavailable':            '503 Service Unavailable',
    'gateway-timeout':                '504 Gateway Timeout',
    'unsupported':                    '505 HTTP Version Not Supported',
    'variant-negotiates':             '506 Variant Also Negotiates',
    'insufficient-storage':           '507 Insufficient Storage',
    'loop':                           '508 Loop Detected',
    'not-extended':                   '510 Not Extended',
    'network-authorisation-required': '511 Network Authentication Required',
    'network-timeout':                '599 Network Connect Timeout Error'
}

def build_headers(status, content_type):
    return "".join([responses.get(status), content.get(content_type)])

def get_fields(field_storage):
    return {k:field_storage[k].value for k in field_storage.keys()}

def get_cookie(cookie_string):
    cookie = http.cookies.SimpleCookie()
    cookie.load(cookie_string)
    return {k:cookie[k].value for k in cookie}

def set_cookie(args):
    cookie = http.cookies.SimpleCookie()
    for key in args:
        cookie[key] = args[key]
    return cookie

def redirect_to(url, message):
    return '''
        <head>
          <meta http-equiv="refresh" content="5; URL={url}" />
        </head>
        <body>
          <p>{message}</p>
          <p>If you are not redirected in five seconds, <a href="{url}">click here</a>.</p>
        </body>
    '''.format(url=url, message=message)

def db(location):
    def factory(cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d

    conn = sqlite3.connect(os.path.join(location))
    conn.row_factory = factory
    cur = conn.cursor()
    return conn, cur
```

To spawn a basic development server, I just run `python3 -m http.server --cgi` in the root of the project. The really neat thing is that you don't have to reload the server at all, because scripts are loaded and executed with every request. True stateless development!

Working this way means I don't have to worry about setting up `FastAPI` or `Django`, or making a `Docker` container before I have to. I can focus on the business logic and datastore, and when it's time to scale up, I can move most of those functions to a framework mostly intact. I love the `Python + CGI + SQLite + VanillaJS` prototyping stack. I use it for prototyping, then I move away it once it reaches its limits.
