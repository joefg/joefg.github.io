---
layout: layouts/base.njk
menu:
  visible: false
  title: Colophon
  order: 1
---

## Colophon

<section class="notice">

**Last update: 23/6/26**

This is a [colophon](https://en.wikipedia.org/wiki/Colophon_(publishing)),
which describes aspects of this website, including its preparation,
its authorship, and its present status.

</section>

### Author

All content on this blog is authored by me and me alone. Topics include software
and technology.

### Content

There are no external contributions and I will not be accepting any. I
do not take any sponsorships and will not publish sponsored content. I don't
participate in [link farming](https://en.wikipedia.org/wiki/Link_farm) or
other SEO dark patterns.

The contents of this site remain copyright of the author and must not be
reproduced elsewhere, including in use for training any form of
AI without explicit written consent.

You may retain a private copy of any content on this site, but I ask that you do
not mirror this site, fair use notwithstanding. Media must not be hotlinked.

This site contains zero AI generated content. For more details on my AI
use, please read [this document](/ai).

### Technology

This site is built with [Deno](https://deno.com/), [Lume](https://lume.land/),
and [Simple.css](https://simplecss.org/), source code available
[here](https://github.com/joefg/joefg.github.io). It is hosted on [GitHub
Pages](https://docs.github.com/en/pages) and is deployed on push to `main`.

This site has no analytics, and does not track the user. This site does not
require a login and does not collect personal information.

This website [uses less than 0.01g of CO2 per
visit](https://www.websitecarbon.com/website/jfg-name/).

### Contact details

<button style="display: none" id="copy-on-click">
Click to copy my E-Mail address to your clipboard</button>

Make sure there's a subject line. Preference goes to people who I know in
person.

I do not respond to spam and turn-around time is measured in days or weeks.

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
copyOnClick.style.display = null;
copyOnClick.onclick = () => {
    copyTextToClipboard(copyOnClick, "me" + "@" + "jfg.name");
};
</script>

For the benefit of identify verification, this is [my 𝕏](https://x.com/joefg_).
I don't use it very often as I disagree with many of its design decisions
though.
