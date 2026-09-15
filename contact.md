---
layout: layouts/base.njk
menu:
  visible: false
  title: Contact
  order: 1
---

## Contact

<div align="center">
    <button style="display: none" id="copy-on-click">
    Click to copy my E-Mail address to your clipboard</button>
</div>

Make sure there's a subject line. Preference goes to people who I know in
person.

**I don't respond to spam and turn-around time is measured in days or weeks.**

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
I don't use it very often as I find the platform to be ill-suited for discussion.

I have a LinkedIn, but that is only for people who I know in person.
