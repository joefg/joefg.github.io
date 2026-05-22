---
layout: layouts/home.njk
menu:
  visible: true
  title: 🏠 Home
  order: 1
---

## Current

Academic sabbatical, pursuing an
[MSD in Computer Science at the University of Essex](https://www.essex.ac.uk/people/FULLE04707/Joseph-Fuller-Gray).
Subject: "Pig behaviour detection using computer vision".

## Previous

GIS developer in utilities infrastructure, then GIS developer in energy consultancy and
decarbonisation. Then farmer and textiles merchant.

## Publications

* [Git for Graduates](https://git-for-graduates.pages.dev) (2024) - a pocket
    book I wrote for teaching consultants how to use Git.

## Contact

<button style="display: none" id="copy-on-click">Click to copy E-Mail address.</button>

**No spam please!**

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
