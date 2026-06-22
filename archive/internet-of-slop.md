---
title: "The Internet of Slop"
description: Why the internet's dying
date: 2024-09-29
location: Cambridge, England
topic: Rant
---

In a few years, the consumer web will be completely unusable for most people.
Here's why.

## Content generation is cheap

The pricing structure for GPT-4o, as used through OpenAI:

| Model             | Price per 1k tokens           |
| ----------------- | ----------------------------- |
| gpt-4o            | $0.005 input / $0.015 output  |
| gpt-4o-2024-08-06 | $0.0025 input / $0.01 output  |

This is ridiculously cheap. Some 10x cheaper than a few years so. What if I told
you there's an even cheaper option?

| Model             | Price per 1M tokens           |
| ----------------- | ----------------------------- |
| gpt-4o-mini       | $0.015 input / $0.60 output   |

Think of it like this: that's nearly a fat dollar per month for a million bot
replies!

## Scraping has ruined everything

Language models require a lot of data to train. It's therefore no surprise to
find that in addition to the usual large textual datasets freely available to
everyone many model developers are scraping the consumer web too.

I'm conflicted about this. On one hand, there is no protocol-level paywall and
there is little to no expectation that stuff put onto the public web is private.
On the other, scraping the web and separating the content from the advertisement
and contributing nothing back seems a little more than rude to me.

When Elon bought Twitter, one of the things he did was shut off access to the
Firehose API and put the rest of the API under a restrictive license. This had
the consequence of killing off services like
[Nitter](https://github.com/zedeus/nitter), which allowed someone to use Twitter
without using the web app on low-end devices. The rationale behind this is that
companies like OpenAI were scraping excessively, causing load issues.

Reddit did similar: they walled off their API, killing several clients (such as
[Apollo](https://web.archive.org/web/20230614002523/https://www.theverge.com/2023/6/8/23754183/apollo-reddit-app-shutting-down-api)),
waiting until developers of [accessibility extensions
complained](https://web.archive.org/web/20230613232547/https://www.theverge.com/2023/6/7/23752804/reddit-exempt-accessibility-apps-api-pricing-changes),
and breaking several browser extensions aimed at helping subreddit moderators
manage their subreddits. Again, they blamed AI companies scraping, but not too
long afterwards agreed a [deal with
OpenAI](https://openai.com/index/openai-and-reddit-partnership/).

In the end, we won't have an open web anymore. Everything will be through
managed clients. The experience will be tightly controlled. Data will be sold.
The user will not be able to curate their experience with browser plugins
anymore, because they'll be blocked too.

## SMS is broken

Contrary to popular opinion, a phone number is not solid proof of humanity. In
many places you may need ID to buy a SIM card, but there are ways around this.

* Developing nations don't have restrictions on who can buy SIM cards or how
many they can buy, so it's not uncommon for people in developing nations to buy
up loads of SIM cards and phone numbers to sell onto bot farm operators.

* Bot farm operators sometimes have their own private phone network providers
which can talk [SS7](https://en.wikipedia.org/wiki/Signalling_System_No._7). The
[abuse of SS7 is the worst kept secret in the Telco
biz](https://www.youtube.com/watch?v=wVyu7NB7W6Y). Why it hasn't been dispensed
with is beyond me.

* A hypothetical scheme: a cryptocurrency liquidity attack system which
incentivises people to lend their phone number to bot operators to bypass SMS
gating. It doesn't even have to be crypto. A popular messaging app was caught
[doing similar things, in
reverse](https://news.ycombinator.com/item?id=39824827)!

## There is no proof of humanity

X's verification system is simple: pay for a tick and you might be required to
submit ID. This has two issues:

1. It's trivial to spawn alternative credit card numbers. I can do that with
   Revolut and Monzo. One credit card number is not one human.

2. How confident are you that X can tell a fake from a genuine driving license?
   Fakes have moved on since the McLovin days.

There have been attempts to make a cryptographic proof of identity. Remember
[WorldCoin](https://openai.com/index/openai-and-reddit-partnership/)?

One suggestion I've seen is using biometrics sensors in smartphones to verify
humans without forcing users to use real names on social media accounts, a kind
of challenge/response mechanism for web services. It might have legs, but it
might not. Even so, it's another step towards un-freedom for what used to be the
free web.

## A split web

My suspicion (which I'm already seeing evidence of) is the web closing off. As
social media platforms get more and more slop loaded onto them, people will
retreat back into closed spaces. The group chat will become the new social
media. It'll allow a sincerity not seen on the surface web, but the world will
not benefit from it.

While this happens, the surface web will spawn more and more slop. The platforms
won't stop it, because it's in their interest to not stop it. The less
sophisticated internet user who already like AI slop content won't notice, but
the more sophisticated user will retreat from it. Or they'll go to platforms
which nominally charge a fee to be from slop, but how long will they last? After
all, the first mover holds the advantage, and the slop merchant who breaches a
slop-free zone stands to make a lot of money.

## An alternative

It would be a shame to kill off the open web or vandalise it in this manner, so
why not try to salvage it?

1. Verify proof of humanity through locally-stored biometrics. I don't think we
should start uploading biometrics to the cloud, because that's a poor idea in
light of security breaches in recent years. Why not a simple challenge/response
standard? I have a [YubiKey](https://www.yubico.com/), which plugs into a USB
port and uses the [WebAuthn
API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)
built into most browsers to issue a challenge/response, principally for
multi-factor authentication on web services. Why not have something similar for
biometrics? Not a login, but a proof of person.

2. Web services should display a "Verified by Biometrics" icon next to verified
users' names. Not a tick, but something different that is **only** for
bio-verified users. Make it a technology that web services should pay for, but
if they abuse it, take it away from them.

3. An altogether more radical proposal: a public database of user public keys
with whether they've been bio-verified. Stick it on the blockchain and ensure no
single entity controls it. Again, you don't have to use real names (and you
shouldn't!) and it doesn't have to identify the person, just the identity. This
can form part of an out-of-band verification scheme for (2), above.

I'd love for browser developers and open-source to do this before Facebook and X
do, because this is an **existential problem** for the open web.
