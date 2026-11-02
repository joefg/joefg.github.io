---
layout: layouts/base.njk
menu:
  visible: false
  title: Contact
  order: 1
---

## Contact

E-Mail is my preferred method of contact for website and other enquiries.

<div align="center">
    <button style="display: none" id="copy-on-click">
    Click to copy my E-Mail address to your clipboard</button>
</div>

Make sure there's a subject line.
**Please note that turn-around time is measured in days or weeks.**

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

### Other platforms

For the benefit of identify verification, this is [my 𝕏](https://x.com/joefg_).
It's currently inactive as the algorithm is pretty much unusable and serious
people stopped using it a good while ago.

I have a [LinkedIn](https://linkedin.com/joseph-fg), but that is only for people
who I know in person. I almost never use it either, because the serious
discussion is elsewhere.

The real good stuff is in
[groupchats](https://sriramk.com/group-chats-rule-the-world). If we're mutuals,
say hi!
