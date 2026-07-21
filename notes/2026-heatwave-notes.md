---
title: "2026's Heatwave Potpourri"
description: Various dishes
date: 2026-07-22
location: Cambridge, England
topic: Assorted notes
---

Some notes from the heatwave.

### Using MaixCam Pro

I picked up one of these as part of research work and I'm also pleasantly
surprised at how easy it is to use. Note that it is still a development kit.
It's not production hardware, but it could be.

![MaixCam Pro](/img/maixcam_pro.webp)

#### OS

It runs a [BusyBox](https://busybox.net/about.html) environment on
Linux including an SSH server, so you can indeed `ssh` into it from
over the network.

```bash
ssh root@maixcam.local # Default password is root
```

SCP works too. By default the `root` user has access to a `models/` directory
containing a load of trained models, but going back into `/` gives you access
to `maixapp/`, which allows you to sideload your own apps.

#### Python

It uses the MaixPy library, which is pretty neat, and you can write computer
vision classification wrappers in it.

From the [GitHub](https://github.com/sipeed/MaixPy).

```python
from maix import camera, display, image, nn

classifier = nn.Classifier(model="/root/models/mobilenetv2.mud")
cam = camera.Camera(classifier.input_width(), classifier.input_height(), classifier.input_format())
disp = display.Display()

while True:
    img = cam.read()
    res = classifier.classify(img)
    max_idx, max_prob = res[0]
    msg = f"{max_prob:5.2f}: {classifier.labels[max_idx]}"
    img.draw_string(10, 10, msg, image.COLOR_RED)
    disp.show(img)
```

A package, at its most basic, looks like:

```
app/
 |-- app.yaml
 |-- main.py
```
 I'd love to see a
 [imgui](https://github.com/ocornut/imgui) though.
This could be neater. I don't like that it uses a systemwide install of
the MaixCam library. This is where [uv can be
used](https://docs.astral.sh/uv/guides/package/#preparing-your-project).

```bash
# Build Python package to dist/
$ uv build

# Send it to maixcam device over scp
$ scp -r dist/ root@maixcam.local:/maixapp/apps/your-app/
```

It's worth noting that there's also a [C/C++
library](https://github.com/sipeed/MaixCDK) available. I'd love to see a
[imgui](https://github.com/ocornut/imgui) though.

#### Other cool things

- [PicoClaw](https://picoclaw.io/) runs on a MaixCam Pro! Just don't expect it to
run a language model particularly well, you will still need an API key and
an inference service.

- It's worth remembering that this device is a
[RISC-V
device](https://github.com/sipeed/sipeed_wiki/blob/main/docs/hardware/en/maixcam/maixcam_pro.md)
with a neural network accelerator. If it compiles to RISC-V, there's
a good chance it could run. Have a look at the PicoClaw repository to see
how PicoClaw does this.

- I haven't tried the MaixVision IDE but it looks decent.

- The [Plaza](https://maixhub.com/share) shows some pretty cool uses for this.

### Using an immutable root OS

After the AUR
[debacle](https://www.phoronix.com/news/Arch-Linux-AUR-400-Compromised), I
decided to move over to an immutable root OS. It did mean I had to change
my workflow.

* I containerised a lot of my projects. If a tool wasn't available to install
in my user, I had to either find it on [brew](https://brew.sh) or just use a
container. Case in point: pandoc and LaTeX.

* I'm still not sold on [devcontainers](https://containers.dev/). Sorry! You
might as well just have a containerised application similar to how you
would have a containerised application on prod.

* Flatpak isn't too bad. Sacrilege, but it doesn't bother me too much that it's
pretty much an app store. At least Flatpaks can't access absolutely everything.

I found [Project Bluefin](https://projectbluefin.io/) to be perfectly adequate.
Full-disk encryption as standard. Transparent updates. It doesn't "hide things"
from you, but it does prevent you installing things as root. It's a reasoned
compromise. I like Arch, Arch has done a lot for the community, but I don't
really have much desire to nanny Arch when updating things.

### Containerising LaTeX

I currently use a immutable root operating system, which means I can't
install any packages to the root, and must either use
[Homebrew](https://brew.sh) and user-local package managers, or
use a container.

I'm writing a dissertation, and in academia you use LaTeX. Which isn't in
Homebrew. I don't want a nest of binaries in my home directory, so I opted
for a containerised LaTeX. I already had a `Makefile` containing what LuaLatex
command I need, so I just want a way of running this inside a container.

```bash
# Pull the latest blang/latex container with LaTeX on it
$ docker pull blang/latex:latest

# Run it
$ docker run \
    --mount "type=bind,src=$(pwd),dst=/data" \
    -it blang/latex \
    make build
```

Done!

### Recommendations for GIS tooling

I spent some time playing with [kepler.gl](https://kepler.gl/). Pleasantly
surprised at how performant it is on my old ThinkPad connected to a 4K display.
If there's one concern it's how to version data between users, but that's not
enough for me to discourage it. I would use this over other hosted services.

I'm also passing on SpatiaLite in favour of
[DuckDB](https://motherduck.com/blog/geospatial-for-beginner-duckdb-spatial-motherduck/)
for spatial work. It's quite simple. I still think PostGIS is better, but
not everyone can stand up a PostGIS server.

Now's also a good time to ditch Jupyter in favour of
[Marimo](https://molab.marimo.io/github/marimo-team/gallery-examples/blob/main/notebooks/geo/earthquake.py/wasm?ref=gallery&utm_source=gallery). 
