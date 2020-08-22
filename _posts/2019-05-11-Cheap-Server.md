---
layout: post
title: "A Cheap Dev Server"
date: 2019-05-11 20:30:45
description: In Which I Show A Cheap Dev Server To Mess About On
categories:
- blog

permalink:
---

You don't need an expensive VPS to mess about with things on a server.

I wanted a little server to mess about with things in my off time. My criteria was simple:

1. It had to fit on my desk.
2. It had to be upgradeable.
3. It had to be cheap.

A little itty-bitty Raspberry Pi would not do -- I wanted more than 1GB of RAM and an x86 processor. A Pi has its place -- but a full-fat development server is not it.

## So what options are there?

This server is predominantly for testing things out and having something to ssh into. I already run Ubuntu as my daily OS on my laptop, and I'm not interested in putting Apache on my ageing ThinkPad. My options are simple:

1. Rejig my old gaming PC for this purpose;
2. Build an entirely new PC;
3. Buy an old PC and stick Ubuntu server on it.

Option 1: I could have done it, but the old girl isn't power efficient -- I still use it occasionally for gaming, but it has an old GTX 550Ti inside it, and it's not used that much anymore. Any performance gains with CUDA are meager with such an old graphics card.

Option 2: A PC for ML tasks requires a powerful graphics card, which alone is quite expensive. A good build for this would come to £1000+.

This leaves Option 3: buy an old PC, put some more RAM in it, and stick Ubuntu Server on it, and run it on my LAN.

## My Little Old Home Server

![What's on it](/public/img/home_server/fetch.png)

It's not much -- I suspect it once belonged to a university or a SME at some point in its life, running Excel or Sage or something. I bought it from a computer fayre in Ipswich, from a slightly shifty chap who was selling old ThinkPads, for just under £80 including a copy of Windows. Some more RAM is in the post, so I can max it out. I put a wireless card in it, gave it a permanent IP address on my LAN, and now use this to mess about on. I put my vim config and bash aliases on it, and went about my way.

## Wait, why use this for machine learning?

I'm just getting back into it -- as a broke graduate, I can't dunk that much money on a computer not knowing whether I'll keep interest in it or not.

CPU training is always slow. Something to remember is that training is only a small part of building a ML system. There's plenty of other things to consider. It'll be fast enough for scraping, processing, and building datasets to use. If you want to train something, there are better ways of doing it than running it on an old PC sitting on your desk. That's what cloud computing services are for, especially when starting out. Using AWS is expensive when you're doing lots of training, and past that point a GPU-based system would be much more cost-effective -- but for the newbie, AWS is cheaper than building a new machine learning PC.

This fills a suitable niche -- I can test and prototype on this machine (with very slow training times), then I can build a docker container or something similar to run on an cloud computing instance for training purposes. It has a hard drive large enough to store large datasets, which can be compressed and labelled on that device. If this machine learning thing works out, I can maybe justify building a monster of a machine learning PC -- but until then, I can just use this arrangement.

## What's the setup?

At the moment, it's just sitting on my desk, connected to the LAN through WiFi -- not ideal, but the router is in a somewhat damp part of the house, and I don't want to drench the poor old server. It doesn't have the fastest of connections, but it's fast enough to have a couple of SSH connections open.

It's running Ubuntu Server at the moment. Ubuntu Server is production-quality, with up-to-date repositories and plenty of packages available in those repositories. I would happily go for Debian, but getting the WiFi card to play ball with Ubuntu was bad enough -- one day, it'll be connected through a good old-fashioned Ethernet cable.

I'm mostly a Python programmer, so I can take advantage of `virtualenv` and `venv` in terms of keeping versions of TensorFlow and PyTorch compartmentised. I do most of my work on it through an SSH connection, with `vim` poking through. For experimentation, I'll use `jupyter`, which is a web-based notebook which can connect to specific Python installs, which works very well with `venv` environments. I used it in my dissertation, and it's quite nice.

It runs as a server, with no desktop environment or web browser to speak of -- so it doesn't use that much memory idle.

It's not running much at the moment, but when I put more RAM into it, I'll probably put PostgreSQL and Apache installs on it for quick and dirty prototyping of web services. I'm considering putting PostGIS on it, so I can use QGIS to make fun little maps.

## You Should Have One, Too

This is a very good thing for a developer to have. I'd say it's borderline necessity. It's cheap, and thanks to free software, it's pretty useful. Instead of toasting my poor old ThinkPad with TensorFlow, I can just put it on this machine, and it'll hum away somewhere else in the house. If I break something in software, I can fix it at my leisure without breaking my laptop. I can upgrade it whenever I like. It's also cheap enough so if I break something in hardware, I can buy another one.

It's something all developers should have. You get experience of managing a server install without hooking something up to the outside world. When it breaks, you learn how to fix it. You get extra compute power and storage. You can prototype little projects on it. If you wanted to, you could run a Minecraft server on it for your house of rowdy academics.

