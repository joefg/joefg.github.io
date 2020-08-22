---
layout: post
title: "Versioned Document Preparation With LaTeX And Git"
date: 2020-05-30 15:45:25
description: In Which I Show How To Version A Document With LaTeX and git
categories:
- blog

permalink:
---

I think that [LaTeX](https://www.latex-project.org/) is pretty cool. It allows you to focus on the contents of the document, and only the contents of the document. You don't have to install Microsoft Word. You don't have to realise that LibreOffice isn't as good as Word. You don't even have to use Google Docs and remain at the mercy of the Borg. It's a documentation preparation system that's built on solid [Unix Principles](https://en.wikipedia.org/wiki/Unix_philosophy).

It's a product of Unix Philosophy, however, which means you don't have an IDE to use by default. Sure, they exist ([TeXStudio](https://www.texstudio.org/) for LaTeX is decent, and [LyX](https://www.lyx.org/) is closer to Word than anything else I've seen), but that's not the point of Unix Principles, and they're still not playing well with version control systems. 

TexStudio, nice as it is, [won't have git integration just yet](https://github.com/texstudio-org/texstudio/issues/59) as it would require some substantial changes to the IDE, and LyX is [still using RCS](https://wiki.lyx.org/LyX/VersionControlInstallationAndUsage), with `git` as a second-class citizen, making these monolithic IDE-based solutions not practical for our particular use case.

If we treat LaTeX as another programming language, with the `pdftex` compiler being a command line program that does one thing, let's expand this idea to consider using the shell to use other tools for effective versioning of a document.

## Compiling a document
For the sake of this example, let's take a simple LaTeX document to be a single `*.tex` file.

The simple way to do that would be to run this:

```
pdflatex document.tex
```

This, by default, generates some artefacts:

```
document.aux  document.log  document.pdf 
```

The only one of these we really want is `document.pdf`, so we can safely discard this others.

### Automating the build process
Let's use [make](https://www.gnu.org/software/make/) to automate this process. A stupidly simple `Makefile` would look something like this:

```
# makefile

build:
        pdflatex document.tex

.PHONY: clean
clean:
        rm document.log
        rm document.aux
        rm document.pdf
```

For those of you who already know your `make`, you'll notice that the removal of unwanted generated artefacts is dependent on the unwanted generated artefacts being there. Feel free to improve on this for larger document projects.

## Versioning
Now that we're able to separate a PDF document from the contents of that PDF document, we can start to put it in a version control system.

Naturally, we'll use [git](https://git-scm.com/), the only version control system that matters.

Initialise the repository, and add your `document.tex` file to it. Make sure you avoid committing any generated artefacts. You can do this with a very simple `.gitignore`:

```
*.pdf
*.dvi
*.aux
*.synctex.gz
*.log
```

### Adding External Content
You can add external content to your document, like diagrams, pictures, source code, and so on. You can do this in the same way as you do your document: as long as the build script is ran from the base of the repository, you can include anything inside of that repository. You can version it in the same way, too.

### Collaborative Editing
This is where `git` is incredibly powerful.

Instead of committing things onto the `master` branch, consider using a [branch-based workflow](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows). Each contributor should be in charge of ensuring their branch is kept up to date with `master`, and when the contributor wants to merge their branch into `master`, it should be done with some degree of review. Most git web services [have a function for this, called a pull request](https://yangsu.github.io/pull-request-tutorial/).

### Tagging
Another feature of `git` will come in handy: the [tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging).

A suggest use case for this would be to tag each revision of the final distributed document. When all of the feature branches have been merged in and the team approves the release of the document, you can tag the final commit with `git tag -a $VERSION -m $CHANGENOTES`. Make sure you push your tags.

One perk of tagging your releases: it allows you to check out at the exact point in which the document was tagged, with `git checkout $TAG`.

## Deployment
Once all contributors have agreed that the document is ready to go live, it becomes easy to distribute it.

The developer with access to how it's deployed (be it through a web server, a social media channel, a printer) would be able to do the following:

```
echo "Fetching repository..."
git fetch
git rebase

echo "Checking out version $TAG"
git checkout $TAG

make
cp document.pdf /some/other/location/document-$TAG.pdf
make clean
```

There could be another script that runs as a daemon to check whether there's a new pdf in that other location, and if there is, publish it somewhere. It could be copied to a folder that gets synchronised to a remote server with `rsync`, or to a Twitter bot that posts it after copying it to a cloud storage service, or it could be just emailed to a printing service.

## No Monolithic IDE Needed
This is an example of the Unix Philosophy in action: instead of relying on one particular tool, it's possible to change tools out if a better alternative is found.

For instance: say that `pdflatex` isn't working as reliably as it perhaps could. Why not change it for `xelatex`? It's possible to do that without changing the entire versioning or deployment system.

Let's say that `LaTeX` isn't wanted anymore. Why not change all `.tex` files for `.markdown` files? We would be able to generate a document using [pandoc](https://pandoc.org/), and still end up with a `.pdf` to send somewhere.

This way works better for our use case, in that we're not dependent on the innards of one particular monolithic program. We're able to swap parts out where necessary. That simply would not be possible with Microsoft Word or even TexStudio. It's more flexible. It's less fragile. Because `git` is a *distributed* version control system, history is stored on all copies of the repository. If you weren't able to keep a copy hosted on one platform, you can change the `[remote "origin"]` part in `.git/config` to point to a bare repo initialised on another remote computer, and use that.
