---
layout: layouts/base.njk
menu:
  visible: false
  title: AI
  order: 1
---

## My use of AI

<section class="notice">

**Last update**: 29/6/26

This page documents how I use AI and what I use it for.

</section>

### How I use AI

I use it principally to search. My agent has the ability to search
ArXiV and I use it to summarise papers of interest.

I also use it to generate code, **but I never let it commit**. I read
every single line. When I do commit, I make sure I share the billing
with the model used.

**I never use it to write as myself or anyone else**.

**I never send the personal information or intellectual property
of myself or others to a hosted service** without explicit permission.

### My setup

#### Hardware

I have a Dell OptiPlex something-or-other running under my
desk. It has an [RTX Ada 2000
Generation](https://www.nvidia.com/en-us/products/workstations/rtx-6000/)
and runs partially on solar power.

#### Software

I use [ollama](https://ollama.com/) to serve models from that OptiPlex
and [Open WebUI](https://openwebui.com/) to interact with models through a
chat application. A `docker-compose` for this is:

```yaml
services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    pull_policy: always
    ports:
      - "11434:11434"
    volumes:
    deploy:
       resources:
         reservations:
           devices:
             - driver: nvidia
               count: all
               capabilities: [gpu]

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    volumes:
      - open_webui_data:/app/data
    depends_on:
      - ollama

volumes:
  ollama_data:
    driver: local
  open_webui_data:
    driver: local
```

For development purposes, I use [pi.dev](https://pi.dev/) and
have recently started to use [omp](https://github.com/can1357/oh-my-pi).

For agentic work I use [Hermes](https://github.com/nousresearch/hermes-agent).

#### Models

Flavour of the month is [Gemma4:12b](https://huggingface.co/google/gemma-4-12B),
affectionally called Twelvebie. It works very well for what I use it for.

![Nvtop](/img/nvtop.webp)

Twelvebie fits just fine on my RTX Ada Generation with room to spare for
a few Pytorch projects.


