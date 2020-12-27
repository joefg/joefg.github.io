---
layout: post
title:  "The Last Laptop Of The Free World"
date:   2020-12-27 13:31:42
description: Requiem For Free Computation
categories:
- blog

permalink:
---

I want to replace my laptop. My venerable ThinkPad X220 is now overheating. A chunk of the palm rest on the left hand side has given way. The lid is coated with residue from 18-year-old me's poor taste in stickers. The screen is too low-resolution for 2020. There's no USB-C on here. However, I fear it soon won't be possible to replace it with a laptop that's this usable.

## The Sorry State Of Laptop Repair
I haven't cleaned the inside of my laptop in years. The last time I opened it was to install an SSD some three years ago, and it hasn't been opened since. Installing the SSD was very simple: a single Philip's-Head screwdriver on the side of the case allows you access to the hard drive bay. If you want to replace the RAM, you can do this by taking the undercarriage off, also with a Philip's-Head screwdriver. Most other things are kept under the keyboard, which also comes off with great ease.

Compare this to 2019's MacBook Pro. [iFixit give it a 2 out of 10 for repairability](https://www.ifixit.com/Device/MacBook_Pro_13%22_Two_Thunderbolt_Ports_2019). Apple would rather you just replace the laptop rather than attempt a repair yourself. Disgraceful. This is from a company that no longer provides you with a power brick when you buy a new iPhone on the grounds of "saving the environment".

## BIOS, UEFI, And The Gremlins Of Secure Boot
The next thing that worries me about the future of hardware freedom is the persistent effort by entrenched industry to restrict what boots on hardware you have paid for. [UEFI](https://wiki.ubuntu.com/UEFI/SecureBoot) is a complete pain to deal with. Ostensibly, its intention is to boot security: only signed code should run. This is horrifying on multiple levels. Microsoft makes it very plain:

> Secure boot is a security standard developed by members of the PC industry to help make sure that a device boots using only software that is trusted by the Original Equipment Manufacturer (OEM).

[Microsoft's own documentation on the matter](https://docs.microsoft.com/en-us/windows-hardware/design/device-experiences/oem-secure-boot) tries to sell it as a security mechanism. It certainly prevents someone with access to the laptop from booting into Ubuntu ready to raid your hard drive, but it also prevents the user from booting into Ubuntu to *get rid of Windows 10*. A serious operating system concerned about security in this manner would require full-disk encryption from install.

## Hardware Modifications
Older ThinkPads are very well understood. [This is a small list of what can be done to my ThinkPad X220](https://forum.thinkpads.com/viewtopic.php?t=123099). Not only can you simply replace RAM and the Hard Disk, you can replace the screen, add some more USB ports through PCI Express, and change the network card to something more modern.

Good luck doing that to a MacBook made in the past three years, or for anything "commodity" made in the past five.

## The Coming ARM Wars
Apple recently started to use their much-lauded M1 chipset, described as ["Black Magic Fuckery"](https://singhkays.com/blog/apple-silicon-m1-black-magic/). Apple, using an ultra-efficient 5nm manufacturing process and having dedicated cores for modern uses like neural networks separate to the GPU and the CPU first developed on the iPhone and iPad, has once again leapfrogged the competition, in a field where the general consensus was that there's no more innovation.

This, however, does have implications. The M1 chipset is not open. It's not mainstream ARM. It's not x86, which means [it falls down to volunteers to get it working with Linux](https://www.omgubuntu.co.uk/2020/12/apple-silicon-linux-support-project). Even if this developer gets it working, there's no guarantee that he can get the Neural Engine working. If Apple includes any iOS-style jailbreak detection, I suspect the laptop will be considered "burnt" by Apple and it won't receive MacOS updates.

Some design decisions have implications outside of Linux. By integrating everything on the chip, it will not be possible to update aspects of your hardware anymore. It wasn't many years ago that Apple decided to solder on the hard drives to the motherboard, and it still feels like a lifetime ago that Apple decided to solder batteries to the motherboard as well. RAM is the next casualty of this drive to vertically-integrate everything. There's not much more to integrate now that Apple has cut the Intel cord.

I have nothing against ARM laptops. ARM is the perfect Linux platform. Chromebooks use mostly ARM. Android, which uses mainly ARM designs, use the Linux kernel. ARM's open designs allow the [U-Boot](https://gitlab.denx.de/u-boot/u-boot) project to develop a free and more open booting environment for devices. However, the shift to ARM laptops will only allow System On Chip designs to gain further foothold in computing platforms for developers, and as much as I hope [Pine64 keep making open hardware](https://www.pine64.org/pinebook-pro/), what happens when they can't?

## Waiting For A More Powerful Pinebook
I've seemingly found what I'm looking for: the [PineBook Pro](https://www.pine64.org/pinebook-pro/), an ARM laptop focused on open hardware, made for developers, by developers. However, it has been out of stock since August. I check the website daily to see if they have any ISO-keyboard PineBook Pro laptops in stock, but to no avail. The Pandemic rattled their steady supply of 1080p panels.

It's a real pity, because it looks like the thing I'm waiting for: a serious laptop for serious users. It just needs more RAM and more storage that isn't EMMC. More cores would be nice, and it would also be nice if more Linux distributions took advantage of the two big cores and four little cores architecture. It can be done: most smartphones can do this.

Until then, I'm scouring eBay for newer ThinkPads that can be easily modified, or finding parts to repair Ye Olde ThinkPad with.
