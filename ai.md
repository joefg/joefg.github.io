---
layout: layouts/base.njk
menu:
  visible: false
  title: AI
  order: 1
---

## My use of AI

<section class="notice">

**Last update**: 14/7/26

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
of myself or others to a hosted service without explicit permission**.

### My setup

#### Hardware

I have a Dell OptiPlex something-or-other running under my
desk. It has an [RTX Ada 2000
Generation](https://www.nvidia.com/en-us/products/workstations/rtx-6000/)
and runs partially on solar power.

#### Software

I use [ollama](https://ollama.com/) to serve models from that OptiPlex
and [Open WebUI](https://openwebui.com/) to interact with models through a
chat application, with [hermes](https://github.com/nousresearch/hermes-agent)
as an agent.

<div class="notice">

Note that these are serving on localhost via a loopback interface.
This is fine for a homelab environment under a VPN but if you're serving on a
public box then you will need better authentication and a reverse proxy.

</div>

 A `docker-compose` for this is:

 ```yaml
services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    restart: unless-stopped
    ports:
      - "127.0.0.1:11434:11434"
    volumes:
      - ollama_data:/root/.ollama
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
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    volumes:
      - open_webui_data:/app/data
    depends_on:
      - ollama
  hermes:
    image: nousresearch/hermes-agent:latest
    restart: unless-stopped
    command: gateway run
    ports:
      - "127.0.0.1:8642:8642"
      - "127.0.0.1:9119:9119"
    volumes:
      - ~/.hermes:/opt/data
    environment:
      - HERMES_DASHBOARD=1
      - HERMES_DASHBOARD_BASIC_AUTH_USERNAME=${HERMES_DASHBOARD_BASIC_AUTH_USERNAME}
      - HERMES_DASHBOARD_BASIC_AUTH_PASSWORD=${HERMES_DASHBOARD_BASIC_AUTH_PASSWORD}
      - HERMES_DASHBOARD_BASIC_AUTH_SECRET=${HERMES_DASHBOARD_BASIC_AUTH_SECRET}

volumes:
  ollama_data:
    driver: local
  open_webui_data:
    driver: local
  hermes_data:
    driver: local
```

For development purposes, I use [omp](https://github.com/can1357/oh-my-pi).

#### Models

Flavour of the month is [Gemma4:12b](https://huggingface.co/google/gemma-4-12B),
affectionally called Twelvebie. It works very well for what I use it for.

![Nvtop](/img/nvtop.webp)

Twelvebie fits just fine on my RTX Ada Generation with room to spare for
a few Pytorch projects.


