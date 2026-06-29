---
layout: layouts/base.njk
menu:
  visible: false
  title: 🖌️ Doodles
  order: 2
---

## 🖌️ Doodles

This is for a bet someone made when they said that back-end and
data people can't do design. For CSS, check the page source.

### Numberplates

<style>
.numberplate {
    width: 20rem;
    height: 5rem;
    margin: 0 auto;
    padding: 0.25rem; 
    text-align: center;

    border: 1px solid black;
    background-color: yellow;
    color: black;

    font-size: 3rem;
}

.numberplate-rear {
    width: 20rem;
    height: 5rem;
    margin: 0 auto;
    padding: 0.25rem; 
    text-align: center;

    border: 1px solid black;
    background-color: white;
    color: black;

    font-size: 3rem;
}
</style>

<div class="numberplate">
    <b>FOO 84R</b>
</div>

<br/>

<div class="numberplate-rear">
    <b>FOO 84R</b>
</div>

### Notepad

<style>
.notepad {
    border: 1px solid;
    padding: 2px 2px 2px 2px;
    color: black;
    background-color: #fff;
    background-image:
        linear-gradient(90deg, transparent 79px, transparent 81px),
        linear-gradient(#eee .1em, transparent .1em);
    background-size: 100% 1.2em;
}
</style>

<div class="notepad">

**Hello world!**

This is text written onto a notepad.

Interview question: why is the text aligned to the lines?

</div>

### Grid paper

<style>
.gridpad {
    border: 1px solid;
    padding: 2px 2px 2px 2px;
    color: black;
    background-color: #fff;

    background-size: 20px 20px;
    background-image:
        linear-gradient(to right, #eee 1px, transparent 1px),
        linear-gradient(to bottom, #eee 1px, transparent 1px);
}
</style>

<div class="gridpad">

**Hello world!**

This is text written onto grid paper.

Interview question: why is the text aligned to the grid?

</div>

### Instant Photo

<style>

.instant-photo {
    margin: 0 auto;
    border: 1rem solid white;
    border-bottom: 1rem solid white;
    color: black;
    background-color: white;
    width: 30rem;
}

</style>

<div class="instant-photo">
    <img src="/img/aeropress.webp"/>
    <p>The GOAT coffee maker.</p>
</div>

In the style of an instant camera.
