---
title: "Developer Ergonomics"
description: Building a comfy setup
date: 2024-05-07
location: Cambridge, England
topic: Work notes
---

I spend six-plus hours a day developing software. This is what I use to stay
sane.

> Ergonomics is a method of design that focuses on creating objects based on the
physical measure of the human body and the physical processes of people.
>
> <http://blogs.evergreen.edu/brookewalsh/what-is-ergonomics/>

## Linting and Typing

First things first: do your projects have linters? Are they typed, either at run
time or with a type checker?

Start there. Use a linter. Use a type system.

It's more work, but it's worth it. Here's an example:

```python
import sqlite3

class SpatialiteConnection():
    def __init__(self, location):
        if location:
            self.conn = sqlite3.connect(os.path.join(location))
        else:
            self.conn = sqlite3.connect(':memory:')
        self.conn.row_factory = lambda cursor, result: \
            dict(zip([column[0] for column in cursor.description], result))
        self.conn.enable_load_extension(True)
        self.conn.execute('SELECT load_extension("mod_spatialite")')
        self.conn.execute('SELECT InitSpatialMetaData(1);')

    def __enter__(self):
        return self.conn

    def __exit__(self, exc_type, exc_value, exc_traceback):
        self.conn.close()
```

How are you supposed to know what this class expects and what it returns when
used in the context handler? And what happens when another developer comes along
and changes what it returns? You don't compile Python, and while your unit tests
might still work, that change in type might only be apparent on an unhappy path
only traversed in production, which is not what you want.

Let's add some types here.

```python
from typing import Optional
import sqlite3

class SpatialiteConnection():
    def __init__(self, location: Optional[str]) -> None:
        if location:
            self.conn = sqlite3.connect(os.path.join(location))
        else:
            self.conn = sqlite3.connect(':memory:')
        self.conn.row_factory = lambda cursor, result: \
            dict(zip([column[0] for column in cursor.description], result))
        self.conn.enable_load_extension(True)
        self.conn.execute('SELECT load_extension("mod_spatialite")')
        self.conn.execute('SELECT InitSpatialMetaData(1);')

    def __enter__(self) -> sqlite3.Connection:
        return self.conn

    def __exit__(self, exc_type, exc_value, exc_traceback) -> None:
        self.conn.close()
```

Adding types makes things more obvious to the developer, and using a type
checker such as Python's [Mypy](https://www.mypy-lang.org/) or a typing system
such as [TypeScript](https://www.typescriptlang.org/) as part of the development
process picks off type-related blunders.

This comes at the expense of development speed; in my experience, a type system
slows down iteration in the early stages, so take this into consideration before
sticking a type checker on your project.

I believe this trade-off to be wise, so set up a linter and a typing system
before you write a single line of code, and that'll set your project in good
stead.

## Runfiles and Task Runners

If you juggle lots of projects, it can be a mild nuisance remembering if it was
`python3 -m uvicorn main:app` which ran it, or whether it was `yarn run serve`,
or `source venv/bin/activate; python3 bin/serve.py` or whatever.

Avoid all of this by using one run file template across all projects. Use the
same commands across all projects to do the same thing:

* `restore` for fetching dependencies

* `build` for constructing prerequisites for a clean run

* `dev` for a development environment

* `serve` for a production service

* `console` for accessing an administration interface for a service

* `test` for running all tests

* `lint` for running all linters and type checkers

Something like [Scripts To Rule Them
All](https://github.blog/2015-06-30-scripts-to-rule-them-all/).

It's a shame there's not one single standard for a task runner. Deno has a [task
runner](https://docs.deno.com/runtime/manual/tools/task_runner) built-in, which
allows me editing this page to build the site by running `deno task build`, but
that's not quite the same as a single task runner with hardcoded arguments
pointing to user-defined commands.

Not having a common task runner means every single org builds their own, which
is a huge detriment to new starters.

## Note Taking

I keep my daily notes in `~/.todo`, with this script:

```sh
#!/usr/bin/env sh

function header(){
cat << EOM
$(date '+%d/%m/%Y')

---

EOM
}

function todo(){
  local TODAY_FILE=~/.todo/$(date -I).md
  local YESTERDAY_FILE=~/.todo/$(date -I --date='yesterday').md

  mkdir -p ~/.todo
  if [ ! -f $TODAY_FILE ]; then
    touch $TODAY_FILE
    header > $TODAY_FILE
    if [ -f $YESTERDAY_FILE ]; then
      cat $YESTERDAY_FILE >> $TODAY_FILE
    fi
  fi

  $EDITOR $TODAY_FILE
}

todo
```

This creates a todo notepad containing yesterday's todo list, which serves as a
useful reminder of anything left over from the previous business day. All notes
are written in beautiful Markdown, with conversion handled with
[Pandoc](https://pandoc.org/) and
diagrams written in [Graphviz](https://graphviz.org/).

I have a grid lined Moleskine which I've been jotting ideas down in for the past
ten years. My handwriting is not great, but jotting something down which makes
you think about what you're writing because there's no `db` movement for
parchment. 

If I'm out and about and I don't have access to a notepad, I'll write something
down in a messaging app and send it to myself.

*The Pragmatic Programmer* calls these
[Daybooks](https://www.oreilly.com/library/view/the-pragmatic-programmer/9780135956977/f_0041.xhtml).
I found them to be immensely useful. Being able to recognise a problem that you
may have encountered before and immediately finding your solution (or thoughts
approaching a solution) is almost like a superpower. I did have a prototype of
feeding my daybooks into a language model so I can ask myself if I encountered a
problem before, but it didn't go anywhere.

## Tiling Windows

I like a good tiling window manager. For a long time I used
[i3](https://i3wm.org/) and [Sway](https://swaywm.org/), but stopped because of
the customisation minefield that both of those things encourage. I used to have
plenty of time to soup up a Sway config, but now I don't, so I moved back to a
more conventional desktop environment.

I use [Gnome](https://www.gnome.org/). Ubuntu ships with [Tiling
Assistant](https://extensions.gnome.org/extension/3733/tiling-assistant/), but I
prefer [Tactile](https://extensions.gnome.org/extension/4548/tactile). Tiling
Assistant is simpler but Tactile is more comprehensive. Both allow me to manage
either squeezing as much as I can into a 13-inch laptop screen or organising
over multiple displays. I do this using the following settings:

```
-- four windows

| W | R |
| S | F |

-- nine windows

| Q | W | E |
| A | S | F |
| Z | X | C |

-- twelve windows

| Q | W | E | R |
| A | S | D | F |
| Z | X | C | V |
```

I use the four-windows setup for smaller screens, nine-windows for larger
screens, and twelve-windows for multiple screens.

One layout that I use is to keep the editor in regions W to C, with R to V for
the terminal and Q to Z for the web browser. This puts the editor right in
front of you, limiting how much you strain your eyes.

![Ergonomic windows](/img/ergonomics-layout.webp)

The aim is to have the thing you're going to be interacting with most often
front and centre, with everything else in the periphery.

The important thing is that a tiling window manager makes this possible. If
you're on Windows,
[FancyZones](https://learn.microsoft.com/en-gb/windows/powertoys/fancyzones)
does similar.

I also use workspaces. One workspace is for communications and emails, one for
media, and one is for development work. This allow me to keep my flow when
developing.

It's a shame that there's no way to have a text editor appear over the thing
which is directly affected by the text being edited, but here we are.

## Text Editor and the Terminal

I like Neovim and use it to write the first draft, but I use VSCode with
[VSCodeVim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)
to touch it up. VSCode's terminal has support for tmux which is also handy.

VSCode's [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense)
and
[Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance)
makes refactoring Python easier, so no more `git grep -i some_function -- *.py`
and whack-a-mole renaming or project-wide `sed` magic. It is worth noting that
the technology behind this, Language Servers, are [available for
Neovim](https://github.com/VonHeikemen/lsp-zero.nvim) and other editors.

I use tmux inside the standard Gnome terminal, which works well enough for me.

The [standard tmux keymap](https://github.com/tmux/tmux/wiki/Getting-Started) is
OK, but could be improved. I find [tmux for mere
mortals](https://zserge.com/posts/tmux/) to have a pretty solid layout and I've
used it for many years now. 

I still use tmux and Neovim for smaller projects because they stay out of my
way, but if I want linters and type checking in the editor window or
[Development Containers](https://containers.dev/) I'll use VSCode.

## Hardware

Get a good chair. I'm happy with my
[Aeron](https://en.wikipedia.org/wiki/Aeron_chair)-- it helps to know someone
who works in liquidations for the various Silicon Fen startups to get one at a
discount. Paying £1000 for a chair as a solo developer is comical, but a
lightly-used Aeron at £300 is a good deal. You place your carcass on it for a
good portion of the day, so make it comfortable.

Get a decent desk. A wobbly desk will drive you crazy. It should sit high enough
so you don't slouch. I don't believe in the standing desk hype, but the
adjustability is helpful. Keep your drinks on a coaster to avoid staining the
desk.

Get a proper monitor stand. Your copy of "Structure and Interpretation of
Computer Programs" belongs on a bookshelf, not under your monitor. The centre of
the monitor should be level with your eyes. If you have multiple monitors, make
sure you're not staring at bezels when looking straight ahead. It's also worth
considering getting a docking station so there's no rat's nest of cables running
from your laptop to the monitor.

Bluetooth headphones are worth having. I got tired of wired headsets leaving a
mess and I took the plunge after standing up too quickly, pulling my very
expensive laptop off the desk and onto the hard wood floor.

A decent keyboard is good to have as is a decent mouse, but as long as the
keyboard goes "click click click" and the mouse has more than the usual amount
of buttons I'm happy.

## Habits

Sitting at a desk for eight hours a day is [probably killing
you](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7700832/). At least break the
day up!

For your lunch hour: turn your phone off. Leave the desk. Go for a walk. Don't
look at any screen. Don't doomscroll. That email can wait. Don't get in your car
and drive to the shop. Just enjoy being outdoors for a bit. You'll come back
refreshed and ready to work again.

If I find myself at a mental block, I take a break. I have a pull-up bar sitting
on my door, a pair of gymnast rings, and a pair of paralettes on my desk. I do
pull-ups and press-ups, some light calisthenics to take my mind off work for a
bit. I find the [Pomodoro Technique](https://pomofocus.io/) to work well with
enforcing breaks.

It's very important to spend time away from the screen. Pick a hobby that's
preferably away from a screen and away from any sort of internet connection.
Ever wondered why so many software developers take up kayaking, hiking, and rock
climbing?  It's because of this. The red pipelines can't reach you when you're
disconnected.

![Rather be kayaking](/img/rather-be-kayaking.webp)
