---
title: "2026's Early Autumn Potpourri"
description: Various dishes
date: 2026-09-09
location: Norfolk, England
topic: Assorted notes
---

Summer's gone and autumn is here. Some notes.

Best enjoyed with a nice Matcha tea.

### Commitment Schemes: A quick primer

Suppose you're betting on a rugby match with someone who you don't trust (and
who doesn't trust you in turn). How do you make a prediction and actually keep
to it?

One way is to hash it. You take your prediction and run it through a hashing
algorithm. You publish this hash everywhere you can.

A good hashing algorithm shows a unique fingerprint of the input without
revealing anything about the input.

<div align="center">

`C = Hash(prediction)`

</div>

Once the event has concluded, you give your prediction and the other party can
check that the hashes match.

Tip: place the hashes somewhere immutable. This is one use case for a blockchain
system. Make a Bitcion transaction with that hash as a note, wait for it to
appear on the blockchain, and there you go.

### I'm coming round to justfiles

On a lark, I decided to give [Justfiles](https://just.systems) another go,
in the hope I can replace my bunch of Runfiles with Just. Most of my systems
have `just` on them now. Bluefin uses Just for systems admin tasks.

This is what it looks like for this site:

```
image_name := "jfg.name"
container_name := "jfg.name-container"

_default:
    @just --list --unsorted

# Removes artefacts.
clean:
    rm -rf _site/

# Checks codebase.
lint:
    deno check
    deno lint

# Builds site.
build:
    deno task build

# Builds container.
[group('container')]
container:
    docker build . -t "{{ image_name }}"

# Removes container.
[group('container')]
remove_container:
    docker ps -aq --filter "name=^?{{ container_name }}" | xargs -r docker rm -f

# Runs container.
[group('container')]
run_container cmd:
    docker run \
        -p 127.0.0.1:3000:3000 \
        --name "{{ container_name }}" \
        "{{ image_name }}" "{{ cmd }}"

# Serves site
serve:
    deno task serve
```

Because it is designed to be a task runner first and foremost, it generates
a nice looking help doc.

```
Available recipes:
    clean             # Removes artefacts.
    lint              # Checks codebase.
    build             # Builds site.
    serve             # Serves site.

    [container]
    container         # Builds container.
    remove_container  # Removes container.
    run_container cmd # Runs container.
```

You'll want to add the following to your Dockerfile:

```
COPY --from=ghcr.io/casey/just:latest /just /usr/local/bin/
```

Along with this in your GitHub action:

```
- uses: extractions/setup-just@v3
```

[Here's the PR](https://github.com/joefg/joefg.github.io/pull/32).

I'm still in two minds though. I like that bash is a universal tool and can do
a lot, even if it is butt ugly. Most developers are rubbish at writing bash and
the less contact they have with it the better. But it is another set of
syntax to learn for what I use it for, and I do have to add another
dependency to the CI yamls for using it.

I never liked Makefile but I accepted it. Is this any different?

Here's a [cheatsheet](https://cheatography.com/linux-china/cheat-sheets/justfile/).

### POSIX if-installed

I see this a lot.

```bash
if [ -r /usr/bin/git ]; then
    ...
fi
```

Don't do this! Some distributions don't install to hardcoded
paths at root.

```bash
which git && echo "available"
```

Don't do this either! `which` isn't a built-in, some distributions
make it do other things, and it's an external process running at
cost.

Do this instead.

```bash
if command -v git >/dev/null 2>&1
then
    ...
fi
```

This is POSIX compatable, meaning it works with plain old `sh`, ideal
if you're using Alpine or something really minimalist.

You do need the redirect `2>&1` shunt at the end because even the
bash builtins `hash` and `type` dump to standard out.

It may be helpful to wrap it in a function if you use it a lot. I'm tempted
to add it to my various Runfile templates.

```bash
function if_installed() {
    local -r cmd="$1"
    if command -v "$cmd" >/dev/null 2>&1
        then return 0 
        else return 1
    fi
}

# usage:
# if_installed existing_binary    -> 0
# if_installed nonexistent_binary -> 1
#
# ie:
# if_installed "git" && do_thing_with_git || echo "Git not avilable"
```

### The secret herbs and spices

Never, ever give a frontier AI lab your secret recipes.

I'm serious. How did
[OpenAI scoop Buckmaster and Alpöge](https://archive.is/2A3hQ),
given both used OpenAI to work through their proofs?

There is every indication that the frontier labs are running some
kind of scooping operation where they can find work on a
particular field of interest, then finish it themselves using
tokens costing nil.

### bash tidy

A few things I've started to do.

- Local variables should be declared with `local`.
Local immutable variables should be declared with `local -r` This helps
clear up any ambiguity in shell scripts. Personally I hate seeing
variables re-instantiated.

- Consider using `trap` to clean things up on exit. Sure, it tinkers
with program flow, but it's worth it just to be able to grep for `trap`.
A `trap handle_error SIGINT` clears things up massively, but isn't just
for SIGINT. Look at `trap -l` to see what can be trapped.

- Use [shellcheck](https://www.shellcheck.net/). I lint my Runfiles with
it.

- Multiline messages can be handled with a
    [heredoc](https://en.wikipedia.org/wiki/Here_document).

- Have a look at TLDP's
    [stylesheet](https://tldp.org/LDP/abs/html/unofficialst.html).
    In particular, the last bit. Simplicity is best.

Bash will always be a bit ugly, but there are things that you can do
to make it easier to work with.

### Year of the Groupchat

I won't bore you with socio-political marginalia on this website but I do find
people are less likely to share their real opinions on public social media these
days without using a burner account. They're out there.

So where are they?

They're in groupchats. Observations:

1. For every groupchat, there is another groupchat minus the annoying people.
You might not be in that chat. You'll probably never know.

2. A good groupchat need to weed out lurkers. If you're not contributing why
should you stay?

3. Messages from a month ago aren't worth keeping around. 

4. The best groupchats are ones never talked about.

5. You should make the effort to meet your mutuals.

I see this as a vindication of Marshall McLuhan's theories on the
Global Village, and in particular what he argued in
[War and Peace in the Global
Village](https://en.wikipedia.org/wiki/War_and_Peace_in_the_Global_Village):
that the new media would bring back man to tribalism. Wasn't he right.
Decades ahead of his time, perhaps even centuries.

### How to diagnose a slow shell

Suppose you have a souped up shell prompt. It looks something like this:

```
joefg@thinkpad jfg.name main*
>
```

It looks nice, but it's a bit slow. How do you find what the problem is?

First step is to time how long it takes bash to load.

```
time bash -i -c exit
```

This loads your .bashrc.

```
time bash --norc --noprofile -i -c exit
```

This doesn't. Compare the two. Then look through your loaded bash profile and
bashrc. The biggest performance drains are calls to external programmes
and repeated sourcing and shunting of `PATH`. My experience is that
things like [nvm](https://nvm.sh) and [conda](https://anaconda.org/anaconda/conda)
are poorly configured and run regardless of whether you are in a
node or Python project respectively. Load them lazily. Ask Claude how.

### Tools

- [LocalSend](https://localsend.org/) is fantastic.
It's installed by default on Omarchy but I use it elsewhere.

- [Omaconnect](https://github.com/jitendradara12/omaconnect) - I miss
KDE Connect, but this is a pretty good alternative on Omarchy.

- [Blender](https://www.blender.org/), the ole tank that it is, still
does a great job of editing video.
