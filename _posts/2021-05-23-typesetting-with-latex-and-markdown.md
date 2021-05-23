---
layout: post
title: "Rapid Typesetting With LaTeX And Markdown"
date: 2021-05-23 19:30:00
categories:
- blog

permalink:
---
I've had a crush on [LaTeX](https://www.latex-project.org/) for the past six years now. It's the greatest typesetting platform on Earth. The documents it produces tend to be very beautiful and aesthetically pleasing, even if their contents may fall short. I write my CV in LaTeX.

[TeX Live](https://www.tug.org/texlive/) provides your document from LaTeX to PDF or PostScript for easy distribution with no errors in my six years of using it. It is not without its flaws, though. LaTeX is difficult to write quickly, given that there's a large emphasis on closing your macros. I've found [Markdown](https://www.markdownguide.org/) to be far easier to write quickly. It's not suitable for every single document, but for most documents you would ever write, it's good enough.

## Markdown To LaTeX To PDF With Pandoc
In order to compile Markdown to PDF with LaTeX as an intermediary, you'll need to install some packages. These are [TeX Live](https://www.tug.org/texlive/), which is a distribution of LaTeX that does most things for you, and [Pandoc](https://pandoc.org/), which can handle the Markdown.

These are in most Linux distributions' repositories, but for Arch Linux, you can use the following command as root: `pacman -S pandoc texlive-most`.

Once you have your markdown document, compiling it becomes a one-liner: `pandoc your_markdown.md -o file.pdf`.

## Styling
It's possible to add a modest amount of LaTeX commands to your Markdown file so that it compiles with specific options. Here's a configuration that I've found which works for me.

```
---
title:
- Your Title
author:
- Your Name
fontsize:
- 12pt
papersize:
- a4
geometry:
- margin=1in
---

\maketitle
\thispagestyle{empty}
\clearpage
\tableofcontents
\pagenumbering{roman}
\clearpage
\pagenumbering{arabic}
\setcounter{page}{1}
```

This adds a title page, a table of contents, sets the page size to A4, and adds 1-inch margins around your text. The command to run this is the same: `pandoc your_markdown.md -o file.pdf`.
