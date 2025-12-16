---
title: "Modern Typesetting"
description: How to produce textual content for many systems
date: 2025-01-24
topic: Old tech
---

My writing workflow is established at this point: I like writing text in
Markdown, and would rather feed that through a compiler which handles formatting
for me. I'm not interested in using WYSIWYG editors like Google Docs, and
WYSIWYM editors like [LyX](https://www.lyx.org/) are better, but still not my
thing. I've settled on a workflow that works for me.

```
Markdown -> Pandoc -> [HTML|PDF(A4, A5, Mobile)|EPub]
```

I like to keep as much committed as plain text as possible. For text, that means
[Markdown](https://www.markdownguide.org/). For diagrams, either as
[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG), or
[Mermaid](https://mermaid.js.org/). If it's not possible, versioning assets like
JPEGs is acceptable, but I like to avoid bloating the Git index of the
repository as much as I can.

I use Makefiles to orchestrate files. Here's an example, which I currently use
for [git-for-graduates](https://git-for-graduates.pages.dev):

```
all: clean pdf # Builds our files.

clean: ## Cleans generated files.
	rm -f git-for-graduates.pdf;

pdf: ## Creates a mobile-sized PDF (100mm x 150mm) with a 5mm margin
	pandoc \
		-V geometry:papersize="{100mm,150mm}" \
		-V geometry:margin=5mm \
		-V font:11pt \
		--from markdown-multiline_tables \
		text.md -o git-for-graduates.pdf;
```

This is a very basic example. It takes my `text.md`, runs it through Pandoc,
and gives an output. A simple `make all` is enough to clean and build a fresh
copy.

If I wanted to distribute it as an EPub, I can add another recipe.

```
all: clean pdf epub # Builds our files.

clean: ## Cleans generated files.
	rm -f git-for-graduates.pdf;

pdf: ## Creates a mobile-sized PDF (100mm x 150mm) with a 5mm margin
	pandoc \
		-V geometry:papersize="{100mm,150mm}" \
		-V geometry:margin=5mm \
		-V font:11pt \
		--from markdown-multiline_tables \
		text.md -o git-for-graduates.pdf;

epub: ## Creates an epub
	pandoc \
		--from markdown-multiline_tables \
		text.md -o git-for-graduates.epub;

html: ## Creates a singular HTML page
	pandoc \
		--template template.html \
		text.md -o git-for-graduates.html
```

Without *any* additions to the base document, I can distribute my text in
another format. A few minutes of work in building a template using [Pandoc's
templates](https://pandoc.org/chunkedhtml-demo/6.1-template-syntax.html) and I
can create a HTML web page containing my text (as a basic Static Site
Generator).

The great thing about working this way is that you can use modern software
engineering tools to collaborate with others.

* Changes to the text can be done via GitHub/GitLab's Pull Request mechanism,
allowing line-by-line diffs. I have caught plenty of self-inflicted typos this
way.

* Continuous Integration and Continuous Deployment is easy: check that the build
step works, if not the change request doesn't go in, and if it does go in, the
changed text goes live immediately, and if you're very swish and maintain commit
discipline, you can generate the changelog automatically.
