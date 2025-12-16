---
title: "Good Neighbour"
location: Silicon Fen, England
description: Twenty minutes into the future
date: 2025-12-16
topic: Fiction
---

<p/>
<section class="notice">

**Summary**

It's cheaper to surveil than it is to keep your eyes shut. Thanks to the
proliferation of cheap compute, every device is watching everyone, all the time.
But where does this end?

This is neither a celebration nor a condemnation. This is merely twenty minutes
into the future. While none of this is happening *yet*, the technology either
exists, or will exist in a year or two.

</section>

You wake up and look outside. Someone has daubed graffiti on the wall
opposite your house.

> ONE DAY WE WILL RULE YOU

It's most unpleasant, and while you could just wait until the weekend and blast
the graffiti with the jet wash, you're in a mood. So you do some digging.

The first port of call is your dashcam. Out of habit, you reverse your car back
to the house when you arrive home from work, so your dashcam should point right
towards the offending graffiti. Your car is new enough to be outfitted with a
Smart Dashcam, which can record even when the car is turned off thanks to a
battery. You bought it as part of a third-party self-driving kit, which comes
with a permanent data link and some cloud storage.

Now, you could sit there for the next few hours and scroll through some footage
from the previous evening. There's an old thread in the Cambridge University
Usenet group detailing some PhD's efforts at getting police based at Cambridge's
Parkside station to look at [CCTV][1] by helpfully pointing out that binary
search of a video doesn't take that long, but this is old hat. You have an
[agent][2].

```sh
cat << EOT >> job
    BEGIN JOB
    connect to gte-dashcam 
    watch recordings from last night
    take screenshots of when you see someone painting graffiti
    add timestamp and bounding box to a json file
    if you can get a face picture, send it to me
    send screenshots and output to me
    SUBMIT
EOT

goose-job < job
> / Queueing job...
> | Starting job...
> | Running job...
```

While you wait for `goose` to do his job, hearing your home AI server cheerfully
spinning its fans, you make a cup of tea. You run `watch nvidia-smi` in another
window and watch the beefy graphics card do its thing. You may be running it as
part of the blockchain [compute grid][3], but `goose` is borrowing it to
avoid running up the bill from using the grid.

Soon, it returns some results.

```
> | Running job...
> | 
> | FOUND: man painting graffiti
> | TIME: <removed>
> | BBOX: [[300, 300], [900, 900]]
> | SCREENSHOT: <removed>
> | ...
> |
```

You'll have to wait a while for everything else, but you open the screenshot and it looks
to have done as asked. While you're waiting, you ask the local [mesh network][4]
whether anyone else has seen the graffiti. They have, and they're not happy
about it either.

> you: Has anyone else seen the graffiti at the end of Pepys Court Road?
>
> PatrickClark: yes, it's disgusting
>
> CantabMan: disappointing tbh
>
> GeographyGirl: When I get chance I'm going to jet wash it off

```
> | FOUND: man painting graffiti, face
> | TIME: <removed>
> | BBOX: [[500, 550], [600, 700]]
> | SCREENSHOT: <removed>
> |
> \ Goose job done in 2hr 32m 10s
```

Goose has finished, and has given you a mugshot. He's wearing a hood and a
balaclava, which is most unhelpful, and you're sure that Parkside's Finest will
just shrug and say "can't do much, guv". You won't need the police for the next
bit.

Since AI processing became cheap, every single bit of Temu tat with an internet
connection became an AI-powered bit of Temu tat. Thanks to the strange economy
we live in, it's cheaper to buy an AI dashcam than not. In order to make it
cheap, manufacturers hook each device up to the VisionGrid. The manufacturers are
supposed to tell you this, but you'll only find a mention of it in the small
print of the terms-of-service that we all blindly "agree" to. These services
don't serve the general public, but being in the AI business, you are not the
general public.

You open the VisionGrid app, and draw a polygon on the map around the area in
which you live. You click "search", and it shows that eight other dashcams were
recording that night. Access costs 50 VCredits, and you task Goose to connect to
each one, taking a screenshot at that time on each of these cameras. You look at
each screenshot, and find two where he is pulling up his mask. You may not have
his face, but you can still identify the individual in each frame. You task
Goose with producing a [set of identifiers][5], and then you decide to wheel out
the big gun.

One perk of being in the AI business is that you get to see the future before it
happens. While you didn't agree with the IdenTrack feature, you can see the utility
of it. IdenTrack allows anyone to submit a set of identifiers for anything, and
given twenty minutes at a rate of 100 VCredits per minute, it'll give you a path
of where that set of identifiers has been, collected from devices on the VisionGrid
network.

```sh
cat << EOT >> job
    BEGIN JOB
    .OPEN perp.features
    .OPEN bounds.bbox

    find where perp.features has been detected in bounds.bbox in the last 24 hours
    produce a geojson with timestamps containing this information
    alert me when done
    SUBMIT
EOT

vgrid-job < job
> / VisionGrid job submitted
> | 2000 VCredits deducted from your wallet
> \ Job backgrounded

...

> ! GeoJSON output ready. Link: <removed>
```

You open the GeoJSON file in [GIS software][6], and you see where the perp has
travelled.

Working back from the wall at the end of Pepys Court Road, you can see that he
walked down Fallowes Avenue, before going back down Fen Road, heading towards
Cambridge North train station. Toggling the heatmap, you can see he loitered
near the train station car park, before going out of zone for IdenTrack. Not a
Cantabrigian, but a nuisance all the same.

At this point, Parkside's Finest would get involved, but as the kids say: No
Face, No Case. The only recourse is to upload a picture to the GoodNeighbour
app. Most smart doorbells are hooked up to GoodNeighbour, which will alert
homeowners if the perp appears again. You refresh GoodNeighbour, and you already
see that the perp was sighted on Fen Road.

---

[1]: https://x.com/AlecStapp/status/1728953538301345889?lang=en

[2]: https://block.github.io/goose/

[3]: https://cocoon.org

[4]: https://github.com/permissionlesstech/bitchat/blob/main/WHITEPAPER.md

[5]: https://en.wikipedia.org/wiki/Eigenface

[6]: https://qgis.org
