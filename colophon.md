---
layout: layouts/base.njk
menu:
  visible: false
  title: Colophon
  order: 1
---

## Colophon

### Author

<img class="right-img" width=200px src="https://avatars.githubusercontent.com/u/13489445?v=4"/>

All content on this blog is authored by me.

Topics include software, software development, and the impact of software on society.

#### Contact details

<button style="display: none" id="copy-on-click">
Click to copy my E-Mail address to your clipboard.</button>

Make sure there's a subject line, but be aware I do not respond to spam and
turn-around time is measured in days or weeks and not hours.
Preference goes to people who I know in person.

<script>
const copyTextToClipboard = (element, text) => {
    navigator.clipboard.writeText(text).then(
    (success) => {
        element.innerText = "Copied to clipboard!";
    },
    (fail) => {
        element.innerText = "Clipboard copy failed.";
    },
  );
}

const copyOnClick = document.getElementById("copy-on-click");
copyOnClick.onclick = () => {copyTextToClipboard(copyOnClick, "me" + "@" + "jfg.name");}
copyOnClick.style.display = null;
</script>

For the benefit of identify verification, this is [my 𝕏](https://x.com/joefg_).
I don't use it very often as I disagree with many of its design decisions,
but if Musk actually succeeds in making it an Everything App, it makes sense to
keep an account with a username alive.

### Content

**Unless stated otherwise**, this site contains zero AI generated content.

There are no external contributions except stated otherwise, and will not
be accepting any.

The contents of this site remain copyright of the author and must not be
reproduced elsewhere. Media must not be hotlinked.

The author requests that this site is not used to train any form of AI, or used
as part of a
[RAG](https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/)
strategy for enhancing language model output.

### Technology

This site is built with [Deno](https://deno.com/), [Lume](https://lume.land/),
and [Simple.css](https://simplecss.org/), source code available
[here](https://github.com/joefg/joefg.github.io).

It is hosted on [GitHub Pages](https://docs.github.com/en/pages) and is deployed on
push to `main`.

This site has no analytics, and does not track the user. This site does not
require a login and does not collect personal information. This may change at
any time without warning.
