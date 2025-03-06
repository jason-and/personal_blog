---
title: My First Server Project
date: 2025-02-13
modified: 2025-02-13
tags:
  - selfhosting
  - linux
  - networking
  - raspberrypi
  - diy
status: published
---

# Some background

I bought a Raspberry pi4 back in 2021, because I wanted to learn more about linux and I was unaware of virtual machines plus nervous to dual boot on my personal laptop. And so I had this computer that I did some messing with and then was busy and moved. Eventually I removed windows from my personal machine, started with Mint OS, but eventually (different story) moved to Endeavor OS (wanted Arch but maintain a certain fear of breaking my machine).

After all of this time I wanted to learn more about self hosting and networking, The computer was still good after all and I had the time to start messing with it. The internet is full of folks raving about these small computers and the amazing things you can do yourself without having to host with these large companies like Google. I am more and more compelled to pull out from our larger tech ecosystem and embrace the weird and the DIY. Putting the low power pi to work felt like a good place to start instead of buying more hardware to sit around. Also, who knew if I would stick with a project like this!

# the computer

The pi4 has 8g of memory, and a small 128g micro sd card. As a non-CS major, I am unsure of what kind of power this really has, but for small projects like mine, these are really enough, and won't cost a lot from a power/energy perspective.

## Linux install

The first thing to do is to flash the sd card with a linux image of the Raspberry PI OS Lite 64 bit, this saves on space, we don't need a monitor where we're going!

The imager from Raspberry pi is easy to use and efficient. Before the final flash, you are able to all SSH for the device and set your username and password. This is important because we are installing "headless" and will want to access our machine remotely! After the flash was complete, I walked it over to my router and connected to ethernet.

Once the pi was plugged in, back on my personal machine, I opened a terminal and SSH'ed into the pi. [this guide](https://www.makeuseof.com/set-up-raspberry-pi-as-server/) was helpful to me in understanding the settings before flashing the drive as well as the commands for finding the pi. I ignored any wifi aspects as this was a wired connection to my router. I also did not follow the rest of the software installs.

# end

It really is that simple! Now the pi stays powered on in a corner of my apartment waiting for me to put some projects on it. Some ideas for the future are, starting a blog (likely accomplished if you are reading this in a browser) and self hosting the site, setting up Pi-hole for some ad-blocking, and a game server to use with my brothers. I'm excited to see how much the pi can do and use it for it's more or less intended purpose, DIY projects!
