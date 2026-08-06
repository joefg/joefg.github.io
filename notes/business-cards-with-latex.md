---
title: "Business cards in LaTeX"
description: Let's see Paul Allen's card
date: 2026-08-06
topic: LaTeX
---

I'm old-school. Sometimes it's handy to just hand out
a business card with some contact details. It does
earn me a gentle ribbing and the usual "let's see Paul Allen's
card" jokes, but I stand by the practice.

### The document

This is for a single-sided card of size 85mm by 55mm,
which is the standard size for a business card in the
United Kingdom.

```latex
\documentclass[10pt, oneside, final]{article}

\usepackage{parskip}  % remove paragraph indents
\usepackage{graphicx}
\usepackage{setspace}

\usepackage{fontspec}
\setmainfont[Ligatures=TeX]{Libre Baskerville}
\setsansfont[Ligatures=TeX]{Libre Baskerville}

\usepackage[
  paperwidth = 85mm,
  paperheight = 55mm,
  margin = 5mm,
  noheadfoot
]{geometry}

\setlength{\baselineskip}{0cm} % between baselines
\setlength{\topskip}{0pt}      % between header and text block

\doublespacing

\begin{document}
  \thispagestyle{empty}

  \begin{center}
  \vspace*{\fill}
  \centerline{\underline{\large\textbf{Your Name Here}}}
  \centerline{Your Occupation}
  \vspace*{\fill}
  \end{center}

  \vfill
  \centerline{\texttt{you@example.com}}
\end{document}
```

### Building

This requires a working LaTeX, which can be a pain to set up.

I use `lualatex` which I find to handle fonts better than plain
LaTeX.

Happily, you can use a [latex Docker
image](https://hub.docker.com/r/blang/latex) to build it.

```bash
docker pull blang/latex:latest

docker run \
    --mount "type=bind,src=$(pwd),dst=/data" \
    -it blang/latex \
    lualatex card.tex
```

This produces a card which looks like this.

<img class="centered" src="/img/lets-see-paul-allens-card.webp"/>

### Printing

Take your PDF file and send it to a printer of your choice.

Ta-da!
