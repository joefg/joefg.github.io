---
title: "Where the pavement ends"
description: Various dishes
date: 2026-05-10
location: Ely, England
topic: AI bubble
---

So, what did I tell you all? That when the rug is pulled, you're all going to
have your backsides hanging in the wind?

Recall that Cursor burns $5000 for your $200 plan, and [weep for the wild
times](https://x.com/championswimmer/status/2048861961551503408). I've heard
similar numbers from industry. Now you're hooked. You're dependent on that API,
along with a million others who didn't want to [miss
out](https://en.wikipedia.org/wiki/Fear_of_missing_out). Now they're coming for
the other $4800, and that is just to **break even**. Cursor didn't even train
their own model. They finetuned existing models. Cursor ran out of runway, got
acquihired by x.ai, and now they're going to pull the rug.

It costs over a billion dollars to train a frontier model like the type OpenAI
or Anthropic have. Each frontier model has a life of six months. In that six
months, that model needs to rake in just under $170m, **for training**, not
including inference. It needs 833,334 people to pay for a $200 plan, again
before inference costs, R&D, the mountain of debt these companies have for
upfront costs, and assuming nobody uses the free product.

Anthropic would need to charge $2000 per user per month to break even, assuming
they even want to do flat pricing. They won't want to. Someone who uses Claude
to create React components isn't going to use as many tokens as someone using
Claude to refactor 20k+ lines of legacy Visual Basic code. There are a load more
React Claudes than Visual Basic Claudes. Claude Code is expensive because the
context window is absolutely massive for programming. Anthropic doesn't want
React people. It wants legacy Visual Basic people. Legacy Visual Basic people
work for insurance companies who get billed $5000/day by legacy contractors.
Insurance companies pay the bills more reliably than the few million slop
developers out there. Expect the rugpull.

> There's a market for maybe five computers.
>
> -- IBM, 1943

Now the next question: does the median developer need Claude? I don't think so.
My experience is that open-source models, while not as good as Claude, are still
pretty good given decent prompts. But what you give up in model quality you make
up in other ways.

* No token worry - you own the hardware.

* Experimentability - you can finetune if you want.

* Privacy - you can tell it everything and unless something's gone wrong it
won't sell your personal thoughts to data brokers.

You can start by buying a used ThinkPad P1 or T15 or something like that with a
beefy graphics card. Install Ubuntu on it, keep it plugged into your router, put
it behind Tailscale, then install Ollama and Open WebUI, and voila: local AI
compute. Then real experimentation can occur.
