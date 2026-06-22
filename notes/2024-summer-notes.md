---
title: "2024's Summer Potpourri"
description: Various dishes
date: 2024-08-27
location: Lyme Regis, England
topic: Work notes
---

Some notes in various forms from over the summer. Some ideas complete; some
incomplete.

![Lyme Bay, Dorset](/img/dorset-2024.webp)

## QR codes

I have a new use for QR codes: simple airgapped copy/paste between my laptop and
my phone.

```sh
# Dump the contents of the clipboard to a QR code,
# and open this QR code as an image.
$ xclip -o -s -c | qrencode -o - | feh --force-aliasing -ZF -

# Do the same, but keep the QR code in the terminal.
$ xclip -o -s -c | qrencode -t ansiutf8 --
```

Suprisingly useful!

This reminds me of the first *Watch Dogs*, where you would scan QR codes hidden
around Chicago to unlock a bonus mission.

## The Post-Internet

Imagine a GPT or a Mixtral large language model running entirely locally on your
phone.

Would you ever need to access the consumer web after that? Would you ever want
to search anything? Would you need to look up how to convert miles to
kilometres?

How about an AI which knows which UI appeals to you most and shows you that, all
the time? Generated content placed between you and the world? TikTok generating
videos for you as a personalised service where nobody actually makes the video?
After that, it would be plausible to never touch the consumer web ever again.

Imagine the web going from user-generated to service-generated, with a twist:
it's not obvious which is which. Think of it like a nastier form of
[Astroturfing](https://en.wikipedia.org/wiki/Astroturfing), that propaganda
technique related to making a big organisation's preferred narrative appear as a
spontaneous, organic show of support from multiple grassroots organisations. You
won't know that a given user is a GAN or not. Neither will other users.
Technology won't ever fix the human bias towards conformity.

The consequence of this is that the consumer web will not just become
irrelevant, but also unbearable and unusable for the average consumer. It would
be barely tolerable with an ad-blocker, and as advanced as ad-blockers may
become in the future, the battle will shift from websites working around
ad-blockers to ad-blockers finding ways of blocking this astroturfed
advertising.

## The Inbox

The proliferation of language models has made your e-mail inbox a very juicy
source of training data for Silicon Valley tech giants.

Now, we all knew what we were getting into when we accepted The Chocolate
Factory's offer of free GMail. It feeds your receipts and insurance documents
into their system so they know who you are and what you buy, to which they can
target you even more. So really, we shouldn't complain, right?

Except now some of this knowledge is making its way into language models like
Gemini. Is it secure enough to be trusted with what I buy from Amazon? Should it
even be in there? And really, was this bargain good enough in the first place? If
my webmail can see that I'm talking to recruiters, the host can deduce that I'm
looking for a job, and it can sell this insight to recruiters, for example. Or
if my webmail sees something like medical records, it can do the same there. How
about business? Should you be handing your business insights to your webmail for
free?

It's even worse for businesses using a personal webmail account this way. The
customer probably doesn't have an immediate need for a paid webmail account and
can be resonably excused, but the notion that a business (in some cases dealing
with big ticket items) can't spend a little money a month doing things properly
is borderline offensive to me. Doing so tells your customers that you think so
little of them that you would rather feed your business correspondence to the
Borg than spend £4 a month (give or take) on properly hosted e-mail.

I hold this: if you're a professional, you can probably spare £4 a month. Pay
for ProtonMail. It's pretty good.  £8 a month gets you a cloud password manager,
cloud storage, and a decent VPN. For two fewer iced Mochas a month you can buy a
degree of digital sovereignty. Having a paying relationship with a service
provider is far healthier than assuming that GMail or Yahoo will be free
forever, because I don't think they will be.

If you want to be really swish, you can buy a domain name and plumb it in. £10
per year, pay for ten years up front and you don't have to worry about renewals
for a while. It looks better than `john.smith1973builder@yahoo.com`, and
contrary to what webmail hosts would rather you believe, it doesn't tie you into
one ecosystem-- you can port that domain to other hosts if you want, and your
e-mails will still work.

## Semantic e-mail subjects

I'm a little tired of seeing subjects like this:

> Quick question

> Bargains Bargains Bargains All This Week At Didldidi

> Can I use your tool?

Don't do this! I want to see what you're talking about so I can prioritise what
I'm doing. Removing my ability to do this is somewhat rude to me. It's what
annoys people about clickbait: it seeks to divert your attention without giving
the reader the chance to prioritise what they're doing.

I suggest *Semantic Subjects*, using the following:

```
<project>: (<enquiry-type>)<importance> <subject>
```

Where:

* `<project>` is the thing the e-mail is in reference to. Name of project, or
business, or group, or service used.

* `<enquiry-type>` is what sort of e-mail it'll be. For my use case, it would
be `enquiry` for general enquiries, `bug` for reporting bugs, `bugfix` for
fixes to bugs, `infra` for infrastructure queries. No hard and fast rule here,
it depends on what the project is and it should be communicated in
documentation.

* `<importance>` is how urgent it is: by default none, if it's an emergency it
should be represented by `!`, with the number of exclaimation points related
to how urgent it is. One for today, two for within the hour, three for right
now. **And abusing this should earn you an addition to the spam filter**.

* `<subject>` is a **terse** description of the e-mail..

All in, it should be less than 80 characters in width. An example would be this
subject, wanting to know about licensing for
[Git for Graduates](https://git-for-graduates.pages.dev/) for use in corporate
training courses:

```
git-for-graduates: (license)! Distributing an ePub
```

I want to be able to regex the project so I can get a list of project-related
e-mails, then regex between brackets for what sort of enquiry it is.

Think [nohello.net](https://nohello.net/en/) cross [Conventional
Commits](https://www.conventionalcommits.org/en/v1.0.0/) but for e-mail.

## Internet office hours

Why treat the Internet like you have to be connected to it all the time?

I would love an "office hours" type thing where someone can see when you're
likely to respond to a message.

I used to work at a company where everyone would have development servers which
they could SSH onto. All of these servers were on a VPN and all ran a web
server, and when everyone went remote, the custom became to check someone's
`index.html` on their server to see what they were doing, and if they popped out
for something. This was prior to adopting Slack and Microsoft Teams.

```
$ curl -S https://joefg.local/

╭─────────────────────────────╮
+───── [ office  hours ] ─────+
|                             |
|  Mon: 9-12:30, 13:30-17:00  |
|  Tue: 9-12:30, 13:30-17:00  |
|  Wed: 9-12:30, 13:30-17:00  |
|  Thu: 9-12:30, 13:30-17:00  |
|  Fri: 9-4                   |
|                             |
|  Sat: N/A                   |
|  Sun: N/A                   |
|                             |
+─────────────────────────────+
╰─────────────────────────────╯
```

It would be nice to integrate this into your social media to at least temper
people's expectations. If someone messages me at 12:29, they should at least get
some "he's about to take lunch" message.

![Office hours designs](/img/office-hours-notepad.webp)

There's probably a cool indie product to be had here: analyse the times of
people's posts and replies, and automatically produce this "office hours"
signage.

Something I did play with was the possibility of locking and unlocking social
media accounts based on a schedule. Unfortunately there's no programmatic access
to this functionality (probably for sensible reasons). It's a real shame,
because this idea that people should be able to just spam whatever at your
profile at any time of the day when you can't respond to it is a nonsense to me.
A 24 hour takeaway joint is only possible because of its staffing rota. There's
only me here. My incognito X account is only open to the public two days a week.
Unless you're using your social media to sell things, I don't see a reason to
keep it open all the time.

## The tech jobs market

The tech jobs market has definitely cooled this year. This happens every few
years. The business has peaks and troughs. It sucks, but it's what happens. The
past four years were the abberation, not the norm, and candidates will now have
to differentiate themselves further, and hopefully the people on Reddit can stop
telling candidates to not do take-home exercises.

It's interesting to note just how bad it is for graduates and junior developers
these days. There just aren't that many graduate and junior developer jobs now.
The usual graduate or junior dogsbody work (hey, go write some unit and
integration tests, or hey, go introduce `eslint` and make the pipeline pass) has
been replaced in part by increased automation available to senior and lead
developers. It'll be tough to even get started in the industry.

At the same time though, will there be "the industry" in a few years? When one
person can corral ten AI agents with only minimal fixups and maintaining focus
on product while customers are able to go through the AI-backed or self-serve
customer service funnel, we might not even have "the industry". It'll be
possible to have a startup of five people turn over a hundred million pounds in
a few years. The top twenty percent of developers will benefit massively. The
bottom eighty percent? Not so much.

Once again, [Vilfredo
Pareto](https://www.marxists.org/reference/subject/economics/pareto/theories.htm)
was right. This round of creative destruction is going to be brutal.

## The secret 𝕏 poster

I not-so-secretly use 𝕏. After not using Twitter between 2016 and last year, I
decided to pick it back up again, but under a pseudonym.

Internet Anons have such a poor reputation, entirely unearned in my opinion.
Pseudonymity isn't bad! Not every 𝕏 anon is a lunatic. Many are, but not all. My
follows tend to be AI researchers with anime profile pics. They're the ones
really pushing the edge of the envelope for what AI can do outside of language
models.

I think 𝕏 under Elon management is actually improving. I was sceptical, but it's
not too bad, provided you do the following:

1. Aggresively curate your feed. Don't be afraid to mute and block. It's not
   wrong to do either of these things, it doesn't make you less of a poster, and
   it's not cowardice at all. Think of it like this: you can drink
   from a hosepipe for a second before it overwhelms you. 𝕏 is the same.

2. Aggressively curate your followers and your replies. Don't be afraid to have
   a minimum set of expectations for people in your replies. Don't engage
   trolls. Just a simple "blocked for trolling", block, and be done with them.
   Life's too short to engage trolls. It's not a free speech issue at all,
   because they're still free to scream from behind a block. Many do!

3. Avoid what can be loosely described as *The Current Thing*. Nobody has a good
   opinion on *The Current Thing*. I certainly don't. I therefore avoid it. I'm
   not interested in engagement farming or clout. If my account ever reaches a
   thousand followers I will delete it. I don't understand how the big accounts
   manage it given the current toolset provided by the site. I suppose it becomes
   a full time job for which they are compensated by ad revenue money.

4. Unless you rely on 𝕏 for your job, don't use it under your real name. This is
   important. Unfortunately we still live in a world where activists think that
   denying someone their free speech by getting them sacked is acceptable.
   Innovation and fresh thought cannot flourish under such conditions. As an
   exension to this: if you see someone dropping dox on anyone, block and
   report. 𝕏 is much better in this respect than Twitter ever was.

5. Don't use the app. The web app is good enough. Tighten up your notifications
   too. You don't want to see every interaction from every single crypto bot.

And no, I'm not going to tell you what my pseudonym is. I like speaking with a
greater degree of candour. The ability to speak freely is important to me. Go
read John Milton's
[Areopagitica](https://www.gutenberg.org/files/608/608-h/608-h.htm) for a
defence of free speech. I do not believe that document to have aged a single
day.

## Smartphone photography

<img width=300 src="/img/dorset-2024-1.webp"/>

<img width=300 src="/img/dorset-2024-2.webp"/>

I picked up a new hobby: smartphone photography.

It's not that difficult. You don't need a professional camera. All you need is a
smartphone and a few apps.

I use my [Pixel 6](https://en.wikipedia.org/wiki/Pixel_6). Google's [Pixel
Camera](https://play.google.com/store/apps/details?id=com.google.android.GoogleCamera)
works well [along with its GCam
ports](https://www.celsoazevedo.com/files/android/google-camera/). You can put a
grid on the viewfinder and this helps you line up your shots. Take your shot,
then you can tinker in
[Snapseed](https://play.google.com/store/apps/details?id=com.niksoftware.snapseed).
My hunch is that the biggest change in smartphones in the past three to five
years has been in quality of recorded images and video. I'm not talking about
sensors here: the [Nokia 808](https://en.wikipedia.org/wiki/Nokia_808_PureView)
held the record for highest pixel count in a smartphone for many years, but the
software was not quite ready. Nokia's next effort, the [Nokia 9
PureView](https://www.gsmarena.com/nokia_9_pureview-8867.php) had a penta-lens
setup, but like its predecessor, the software wasn't there yet. Now it is. The
software is able to make the most of the sensor's capabilities.

It's all signal processing and computational photography now. While "AI" camera
apps can do a lot, there isn't as much art to it as actually lining up the shot
and adjusting colour levels yourself. I found [Marc Levoy's
lectures](https://sites.google.com/site/marclevoylectures) to be a good primer
to modernist photography.

I know some photographers who still use film and they think smartphones to have
ruined photography. They believe the absence of limitation to be the death of
art. I don't think this to be true. Smartphones have allowed more spontaneous
photos to be taken. The best camera is the one you have with you. And the
computational photography aspect allows those instant photos to look even
better. I remember old fixed-focus Polaroid cameras, and while it's somewhat
romantic to only have one shot (and you had to make it count), who wants to go
back to that as the norm?

Incidentally, here are a couple of my Snapseed settings.

| B&W with Frame                           | Rich Colour with Frame                               |
| ---------------------------------------- | ---------------------------------------------------- |
| ![B&W with Frame](/img/snapseed-bw.webp) | ![Rich Colour with Frame](/img/snapseed-colour.webp) |

## Dark mode which respects your browser

I'm a bit sick of dark mode which does not respect your browser. You
don't need JavaScript to have dark mode which respects your browser. For
posterity, this is proof that you can indeed use the browser's dark mode [(which
is in the spec!)](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme)
to respect the user's dark mode wishes.

```css
:where(body) {
    --background-color: #FFF;
    --text-color: #222;
}
@media (prefers-color-scheme: dark) {
    :where(body) {
        --background-color: hsl(228, 5%, 15%);
        --text-color: hsl(228, 5%, 80%);
    }
}

body {
    background-color: var(--background-color);
    color: var(--text-color);
}
```

| Dark | Light | 
| ---- | ----- |
| ![site](/img/bizcard-site-dark.webp) | ![site](/img/bizcard-site-light.webp) |

Easy peasy!

## Task runners

I would love a standardised (and by standardised, I mean "as prominent as Git")
task runner applicable to as many platforms and purposes as possible.

Not having a standard task runner with specific commands makes onboarding harder
for new entrants to a codebase.

`deno task` is [reasonably
good](https://docs.deno.com/runtime/manual/tools/task_runner/), but it's
specific to Deno and it doesn't solve the issue of different orgs having
different approaches to task orchestration.

I built a task runner called `trundle`-- it looks inside a project's `.trundle`
directory and executes scripts `dev`, `serve`, `build`, `test`, `lint`,
`console` scripts from there, but it's not perfect, and really,
this is such a well known problem that it should have been solved by now, and I
don't think adding another task runner would help a jot and adding it to all my
Dockerfiles is a pain.

## Tools

* Someone showed me [Difftastic](https://difftastic.wilfred.me.uk/), and I'm
liking it so far. It's a structured syntactic diff tool for visualising
syntax-level diffs. No good for genrating patchfiles, but very good for merge
requests which make a lot of whitespace changes but with few syntax changes.

* I'm appreciating [Conventional
Commits](https://www.conventionalcommits.org/en/v1.0.0/) more now that I use
it in projects. Still no luck convincing people to use
[Commitizen](https://commitizen-tools.github.io/commitizen/) though.

* I tried [LazyVim](https://www.lazyvim.org/) but found it did too much, and
while I appreciate a souped up `neovim` as much as the next guy, VSCode with
[VSCodeVim](https://github.com/VSCodeVim/Vim) has most of the `vim` magic in
VSCode that most users actually use, and VSCode is nicer to configure when
using LSPs. I still use `neovim`, I'm porting my config over to
[kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim), but I use
`nvim` for the first draft while I use VSCode to lint.
