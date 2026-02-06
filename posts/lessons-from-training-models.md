---
title: "Lessons from training models"
description: What to expect when training models
date: 2026-02-06
location: Ely, England
topic: Work notes
---

Half-way through my MSc, and here are some notes from going from software
development to computer vision research. Some things to expect, and some things
that you should consider if you want to do this as well.

### Minimise the iteration loop as much as you can

* Use a small train and validation dataset. 100 samples is enough
for dev purposes, but you will want more for the real thing. You want just
enough to be able to test your training runs in a notebook quickly.

* The REPL is your friend. I use Jupyter Notebooks to do this.
A script is like programming a synth, but a REPL is actually playing it.

* You will need to write scripts at some point, as Jupyter does time out after a
while.

### You don't need to make massive models

Not wanting to spoil anything, but my research so far (using a dataset of pigs
feeding from a trough) suggests that you don't need massive models to get
state-of-the-art performance. Careful consideration of your data, augmentation,
and tinkering is better than just finding the biggest model.

### Tradeoffs

A big model may well be more accurate, but can you deploy it? A big ViT model
may well work on your compute cluster, but it rapidly fills the memory of a
smartphone when inferring stuff, and it won't work at video rate. Accuracy in
model isn't everything. A 95% accurate State-of-the-Art model might work on
cluster but if it's unusable in the field, it is 95% accurate 0% of the time.

### Hardware is important

You don't want to have to wait until space on the cluster becomes available.
If you can, run things locally, or do what I do and have an AI server at
your disposal. Having your own hardware massively increases your flexibility.

I have a Dell OptiPlex with some RTX enterprise graphics card with 16GB of VRAM.
This is plenty for what I use it for. I put [Tailscale](https://tailscale.com/)
on it so I can access it anywhere.

Know your infra! You should know your SSH, and the wonderful things that it
gives you. [sshfs](https://github.com/libfuse/sshfs) is like manna from heaven
in that I don't have to send things to myself, I can just mount the box's home
directory to my laptop's `/mnt` and I can browse results (and even edit code)
from there.

### Have a mental framework for your models

If I'm evaluating a lot of models, I want them to look more or less the same.
Chiefly: I want them to have a `freeze` function for disabling grad on layers,
and a `reset` function to reset trained layers.

Here's one I made earlier.

```python
def reset_linear(layer):
    def reset_fn(module):
        if isinstance(module, torch.nn.Linear):
            torch.nn.init.xavier_uniform_(module.weight.data)
    layer.apply(reset_fn)


class MobilenetV3Large(torch.nn.Module):
    def __init__(self, n_outputs):
        super().__init__()
        self.model= models.mobilenet_v3_large(pretrained=True)
        self.model.classifier[3] = torch.nn.Linear(1280, n_outputs)

    def forward(self, x):
        x = self.model(x)
        return x

    def freeze(self):
        for param in self.model.parameters(): param.requires_grad = False
        for param in self.model.classifier.parameters(): param.requires_grad = True

    def reset_parameters(self):
        reset_linear(self.model.classifier)


dataset = load_data()

m = MobilenetV3Large(5) # for five output classes
m.freeze()
m.reset_parameters()

trained_model = train(m, dataset, epochs=10)
```

### Disable your linter

I found linters to be such an annoyance when developing things solo that I turn
them off. Similar to type-checking. Training code is rarely prod code, and while
the platonic ideal is 100% linting and 100% type coverage, it takes ages to get
your type checker to play ball. When this is prod code, it'll be rewritten
anyway.

### Adopt a functional programming style

AI work is taxing on your brain, so take the load off by adopting a
functional programming style.

Once you're comfortable with functions on structs over methods on objects,
you'll find that your're able to keep state in your head at an abstract
level.

Note that this conflicts with the above example. Sometimes it's necessary to
summon the OOP demon, but this is the price paid as the OOP demon abstracts some
details away.

### Check your stats

I keep a copy of TensorBoard open when I operate a training run. I do this to
check for when the loss doesn't reduce any further, and for fun patterns in the
statistics.

I found an annoying bug in my K-Fold Validation script after I noticed that the
accuracy would only ever increase across folds, implying some leftover weights
were being carried over between folds.

### Export to ONNX

Once you're done, export to [ONNX](https://onnx.ai/). The default Pytorch format
is a Pickle, which can execute code on load via `__repr__`. Don't do that!
Export to ONNX. Although I hear good things about
[Safetensors](https://huggingface.co/docs/safetensors/en/index).
