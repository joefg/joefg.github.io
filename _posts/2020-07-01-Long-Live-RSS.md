---
layout: post
title: "Long Live RSS (and web protocols as a whole)"
date: 2020-07-01 20:45:25
description: In Which I Show My Like Of Web Protocols
categories:
- blog

permalink:
---
Protocols are nicer and less harmful to end users than services.

## RSS
RSS is a really cool way of delivering a "feed" to you from people you follow. It sounds like a modern innovation, but it isn't. [It's been around since 1999](https://en.wikipedia.org/wiki/RSS).

In short: it makes an XML document available at a set location, which gets updated whenever an update is made on that particular service. Here's an example from [the specification](http://static.userland.com/gems/backend/rssTwoExample2.xml). The specification sets out what goes where, in which format. For a product to be RSS-compliant, it has to follow that specification, otherwise it's not RSS compliant.

I use [newsboat](https://newsboat.org/), but the beauty of dealing with protocols and specifications is that if I decided I didn't like `newsboat` anymore, I could use an alternative, like [this Firefox extension](https://addons.mozilla.org/en-GB/firefox/addon/feedbroreader/), or you can keep it in [a service like feedly](https://addons.mozilla.org/en-GB/firefox/addon/feedbroreader/), if that's your thing.


## Protocols and Specifications are longer-lived than Services and Products
Recall that RSS was released in 1999. At the time of writing, it's 21 years old. It lived through [the first Dot Com Boom](https://en.wikipedia.org/wiki/Dot-com_bubble). It outlived [theGlobe.net](https://en.wikipedia.org/wiki/TheGlobe.com). As a technology, I am reasonably confident that it'll last for another 21 years. It's very [Lindy](https://medium.com/incerto/an-expert-called-lindy-fdb30f146eaf). Compare that to any of the failed Dot Com Boom companies. For every Amazon or Google, there's a [pets.com](https://en.wikipedia.org/wiki/Pets.com), or a [Webvan](https://en.wikipedia.org/wiki/Webvan).

## What other technologies are Lindy?
Here's a quick list (most of these are web technologies):

* [REST](https://restfulapi.net/);
* [CGI](https://en.wikipedia.org/wiki/Common_Gateway_Interface);
* [UWSGI](https://uwsgi-docs.readthedocs.io/en/latest/);
* [ASGI](https://asgi.readthedocs.io/en/latest/)

Unless you're in the business of deploying web applications, these may seem alien to you. They're what power most web applications.

RESTful APIs are what allows you to use Twitter without having to refresh all the time, as the JavaScript code in the web browser is capable of fetching updates from a clearly-defined API endpoint. You can do this in vanilla js by using the native [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) method.

CGI, which is a method of [passing input from a web server handling a HTTP request and passing it back out to the same conneciton through stdout](https://tools.ietf.org/html/rfc3875), is still used today. There's a [module in Python for this](https://docs.python.org/3.8/library/cgi.html). It's trivial to get a CGI web application [set up in apache](https://httpd.apache.org/docs/2.4/howto/cgi.html), and on that basis it'll be around for a long time.

The natural evolutions of this, `uwsgi` and `asgi`, iterate on these by removing the necessity of having one executed instance per HTTP connection. These have their uses, and they're certainly welcome, but they're not in standard libraries yet. For me, that's a golden standard: if the protocol ends up in the standard library, it's going to stick around for a while. In my experience, libraries in the standard libraries won't get removed if someone's using them, and programming languages have a high bar for admitting things into standard libraries. It's entirely plausible that services built on this technology would happily keep on chugging along ten years from now.

## What Isn't So Long Lived
Many of [these aren't under active development anymore](https://wiki.python.org/moin/WebFrameworks). And that's OK! Refactoring takes time, there needs to be clearly defined tests so the developer can verify that behaviour before and after is the same. However, in the business world, the word `refactor` is a naughty word. Developers need a very good excuse to tear things apart, otherwise the Project Managers get scared.

If you build with a framework that isn't maintained anymore, you'll end up having to refactor your codebase. A case in point would be `python 2.7` to `python 3`, which I regard as putting back Python development at least six months.

Building with proven, Lindy technology? You'll have to refactor eventually, sure-- but it'll happen much less frequently.

## Services vs Protocols
Coming back to the point of why I prefer protocols to services: I'm confident that my RSS reader will work ten years from now. A few tweaks might need to be made here and there, sure, but the core of it should still work.

I can't say the same for services like Twitter or Facebook. I don't fancy their chances. Something will eat their lunches one day.
