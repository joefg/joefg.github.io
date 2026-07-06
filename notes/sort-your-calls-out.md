---
title: "Sort Your Calls Out"
description: How to sort your video calls
date: 2026-01-22
location: Wivenhoe, England
topic: Work notes
---

In this strange post-COVID "work from home" world, it's amazing that some of the
best resourced people still haven't sorted their video call setups out.

Not even the [leader of the opposition is
immune](https://www.youtube.com/watch?v=3_AdJ0FhdpA)! The white balance is off,
the background blurring is too aggressive, and the audio is tinny. It doesn't
have to be like this!

This is cribbed from some advice I sent an undergraduate.

### Environment

If you're able to, have a separate area for calls. Put some sound deadening
around. Point the camera to a blank wall. Move posters. And for goodness sake,
clean up.

If you're in a lot of meetings, it may be worth investing in a soundproof booth.
Many co-working places have these booths now. There are a couple in the
[Albert Sloman](https://libanswers.essex.ac.uk/faq/252363) library, although keep
your voice down in these.

It's tempting to take calls on the train. Don't. You don't appear busy, you
appear disorganised, and it annoys everyone else on the train. Turn the laptop
off and read a book or something.

### Camera

Your laptop webcam is OK but it's not ideal.

1. They're often poor quality. Even supposed "High Quality" ones (looking at you
   Apple) aren't that good. There's only so much lens you can wedge into a
   laptop display.

2. They wobble. Here's an experiment: start recording then start typing. You'll
   see that there's a lot of jitter.

3. They're in the wrong place. The camera should be eye level. Either raise the
   laptop or use an external camera.

Get an external camera. Even a £20 one isn't too bad. You might not need 4K, but
you do want a lens cover.

You can use your Android phone as a webcam. I've done this before. My Google
Pixel has this feature where I can plug it in and my laptop will recognise it
as a webcam.

It works surprisingly well! Just make sure you use a tripod to keep it steady.

Take the time to sort white balance and colours. And if you're sitting below
lighting and you can see strobing, change the refresh rate of your camera in
software (although Teams handles this by default).

Flourescent lighting flickers on camera because it runs at
[50Hz](https://www.djtelectricaltraining.co.uk/downloads/50Hz-Frequency.pdf), whereas
your camera records at 60fps. Here's a bash alias I use to adjust this:

```bash
# Requires: v4l2-ctl
# (and adjust video device to suit, video0 is usually the built-in webcam)

function flicker50 {
    v4l2-ctl --set-ctrl power_line_frequency=1 --device /dev/video0
}

function flicker60 {
    v4l2-ctl --set-ctrl power_line_frequency=2 --device /dev/video0
}
```
### Audio

Wear a headset. I have a noise cancelling pair of headphones (Soundcore Pro)
that work reasonably well. Make sure you charge them up before the call.

Don't use a speaker. You'll be forever dealing with echo. And unless you're in a
soundproofed booth, it's just antisocial.

Don't use the microphone in your laptop. It's not very good for exactly the same
reasons that the webcam in your laptop isn't very good. A cheap Lavelier mic
works better, and doesn't take too much room. You can get little ones
microphones on a gooseneck that also work well.

If you're calling from home, I suggest a good condenser microphone with a pop
filter. They're not expensive but sound so much better than the tinny laptop
mic.

### Software

I don't like blurred backgrounds. The blurring algorihms aren't perfect, and it
tells the caller that you didn't clean up. But if you have to, MS Teams does a
good job, as does Google Meet and Zoom.

I'm shifting away from those in favour of [Jitsi
Meet](https://jitsi.org/jitsi-meet/), which works "well enough", and being
open-source, if you don't like something, you are free to change it.

For presentations, I recommend using [OBS Studio](https://obsproject.com/). It's
designed for streaming, but you can use it to blur the background yourself, or
present a screen without the pain of trying to use Teams to share your screen
through the browser.

If you can, don't use the browser. Use a native client. Browsers break
every chat application which uses video, especially when sharing a screen.
They're better than they used to be.
