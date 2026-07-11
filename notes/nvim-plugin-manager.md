---
title: "Neovim's plugin manager"
description: Plugin management
date: 2026-07-11
topic: Neovim
---

I used to use [lazy](https://lazy.folke.io/), which I
still maintain is a very good plugin management
system available to neovim users.

However, nvim has
[vim.pack](https://github.com/neovim/neovim/blob/cbfc3d1cdc199ce65368a2f40dc4b1ddc4331714/runtime/doc/lua.txt#L2529),
and as of `nvim` 0.12 and later, is available to use
out of the box. With that in mind, I decided to
try a more minimalist approach to plugin management.

It's worth pointing out that I don't massively
soup up my `nvim` config. If I want language servers
and autocomplete I'm quite content with [Zed](https://zed.dev).

I really use `nvim` as *just a text editor*, which might shock
some of you.

### vim.pack

It's very simple. To add a plugin:

```lua
vim.pack.add({
    { src = "https://github.com/NeogitOrg/neogit" }
})
```

That's it. It pulls that plugin from the Git repository
and keeps it somewhere in
`~/.local/share/nvim/site/pack/core/opt`.

### Plugin structure

The good thing about this approach is that you can have the
download and configuration of a plugin in one file.

Referring back to `neogit`.

```lua
vim.pack.add({
    { src = "https://github.com/NeogitOrg/neogit" }
})

local neogit = require("neogit")
neogit.setup({
    disable_context_highlighting = true
})
```

This goes into `plugin/` and it is executed on load.
Note that execution order may not be deterministic,
so you would want to keep dependencies in the same `lua`
module.

### Config structure

So what I do is have my config structured as follows:

```
~/.config/nvim/
├── init.lua
├── lua
│   └── joefg
│       ├── init.lua
│       ├── macros.lua
│       ├── netrw.lua
│       ├── settings.lua
│       ├── statusline.lua
│       └── template.lua
├── nvim-pack-lock.json
├── plugin
│   ├── gitsigns.lua
│   ├── neogit.lua
│   └── polyglot.lua
└── README.md
```

This allows me to have a super minimalist `init.lua`.

```lua
local config = require("joefg")
config.setup()
```

Easy peasy! It's also worth noting I can configure
things inside this `init.lua` if I wanted to, but those
would happen after everything else has loaded.
