---
layout: layouts/base.njk
menu:
  visible: false
  title: AI
  order: 1
---

## My use of AI

<section class="notice">

**Last update**: 22/6/26

This page documents how I use AI and what I use it for.

</section>

### How I use AI

I use it principally to search. My agent has the ability to search
ArXiV and I use it to summarise papers of interest.

I also use it to generate code, **but I never let it commit**. I read
every single line. When I do commit, I make sure it shares equal billing
with the name of the model used.

I rarely use someone else's hosted model, but if I do, **I never send anything
to it that I would not tell someone else without permission**, chiefly:

- Source code and proprietary information;
- Personal information.

**I never use it to write as myself or anyone else**.

### My setup

#### Hardware

I have a Dell OptiPlex something-or-other running under my
desk. It has an [RTX Ada 2000
Generation](https://www.nvidia.com/en-us/products/workstations/rtx-6000/)
and runs partially on solar power.

#### Software

I use [ollama](https://ollama.com/) to serve models from that OptiPlex
and [OpenWebUI](https://openwebui.com/) to interact with models through a
chat application.

For development purposes, I use [pi.dev](https://pi.dev/) and
have recently started to use [omp](https://github.com/can1357/oh-my-pi).

For agentic work I use [hermes](https://github.com/nousresearch/hermes-agent).

#### Models

Flavour of the month is [Gemma4:12b](https://huggingface.co/google/gemma-4-12B),
affectionally called Twelvebie. It works very well for what I use it for.
