---
title: "Dark mode that behaves"
description: Dark mode that follows your system
date: 2025-01-03
---

A new year's resolution of mine was to use light colour palettes more often.
Dark colour schemes are OK in low-light, but unfortunately have several problems
in non-low-light situations.

1. Light text on dark backgrounds provide worse contrast, making it harder to
read, and increasing eye strain.

2. The human brain is adapted to finding dark objects in light conditions rather
than vice-versa.

3. Excessive dark mode during the day under bright light strains your eyes.

Most operating systems now offer a means to switch colour palettes. My Google
Pixel does this automatically. I use Gnome, which has a handy toggle for "Dark
style", and this tells applications using GTK to follow a particualar theme.

## Browsers

Firefox and Chrome can automatically set their preferences for light and dark
mode based on the settings of the operating system. Unfortunately, this stops
you using custom theming. If you're on Gnome, set both to use the GTK theme.

## Web pages

I've ranted about this before, but your browser can tell your page that it prefers
to use a colour scheme that is either dark or light. It can do this in CSS, using the
`prefers-color-scheme` property.

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

There's no need to have any JavaScript rewriting of the DOM or anything like
that. There's no need to use a Greasemonkey script either. Just use this
property. Trust the browser for theming because the browser trusts the operating
system for theming. Don't roll your own theming. Just use
`prefers-color-scheme`. Talking about you, 𝕏.

## Terminals

### Ghostty

I use [Ghostty](https://ghostty.org/), which does support light and dark mode.

```
theme = dark:Tomorrow Night,light:Tomorrow
```

### gnome-terminal

On machines where I can't use Ghostty and have to use `gnome-terminal` instead, I keep a
dark mode profile available for use. It doesn't support automatic colour palette switching,
unfortunately.

### tmux

As far as I know, tmux does not offer this functionality, which is a shame. Colours can
handled by the terminal, but status bar colours can't be.

I keep a `tomorrow-night.conf` file and a `tomorrow.conf` file in tmux's XDG directory,
and just `source-file ~/.config/tmux/<tomorrow|tomorrow-night>.conf` to change themes.

Not ideal but the perfect is the enemy of the good enough. This could probably be scripted.

## Text editors

### vim

I use `vim`, which ships with a colour scheme that emulates the `gruvbox` colour
scheme. It's called `retrobox`, it looks decent, plays well with `treesitter` in
`nvim`, and crucially supports `background`.

`set background=light` for a light background, `set background=dark` for a dark
background, and it follows the settings of your terminal emulator and system.

### VSCode

There are built-in dark and light modes, but if you want to use them, you have to
enable the `Auto Detect Color Scheme` option in the preferences. This does follow
what your operating system prefers.

I use the `Tomorrow` and `Tomorrow-Night` colour schemes and set those though
the `Workbench: Preferred Light Color Theme` and `Workbench: Preferred Dark Color Theme`
options respectively.