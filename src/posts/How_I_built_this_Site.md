---
title: How I built this Site
date: 2024-02-14
tags:
  - blogging
  - raspberrypi
  - networking
  - selfhosting
status: draft
modified: <% tp.date.now("YYYY-MM-DD") %>
---

# The Stack
1. **Hardware Layer**
   - Raspberry Pi serving as physical server
   - Running Linux (Raspberry Pi OS)

2. **Docker Container Layer**
   - Manages two containers:
     - Nginx container serving static site
     - cloudflared tunnel to Cloudflare
    
3. **Application Layer**
   - 11ty (Eleventy) generates static site
   - Nginx serves these static files
   - Cloudflare Tunnel provides secure access to the internet

4. **Domain Layer**
   - .com domain
   - Cloudflare providing:
     - DNS management
     - Security
     - Tunneling service

# Server on the Raspberry Pi4

I am using my Raspberry pi 4 as a small home server that you can learn more about here [[My_First_Server_Project]].

I was interested in putting it to use for some self publishing. I have been wanting a place to put my learning out into the world, but am still hesitant about doing that on social media. One obvious benefit of social media is that it is usually free to use and you don't need to build anything, you can get started right away with content. However the drawbacks are considerable if you (like me) are more distracted by other content rather than working on your own! It's not exactly free when you factor your time and the amount of data they collect on you. This space allows me to focus on producing instead of consuming. 

With the raspberry pi, I have the opportunity to host something for free that I make and control, and learn something new along the way. 


# Picking a site Generator

I started by learning about different blogging options that are out there. I wanted to build something myself for educational purposes, so I didn't want to use Squarespace or something that would cost money, this is a hobby after all. Wordpress is a good alternative here, but it seemed to have too much of an interface, more moving parts, and a bit more overhead than I really needed. 

Eventually I came across static site generators. The idea of a site generator excited me because it seemed both accessible to someone new to web development while still being exposed and enough work that I would surely learn something about how the web worked. Instead of using a template and working with a GUI interface, I would have to learn about layouts and chaining layouts, working with text files and directories and putting it all together so that it made something at the end. 

Now it isn't completely DIY (nothing is only you), there is an amazing community of people sharing resources, blogs, repositories, etc. to help someone get started. [11ty](https://www.11ty.dev/) seemed like it had a great community of users, a lot of flexibility in how a project is structured, and was named after a [Tolkien reference](https://11tybundle.dev/blog/11ty-bundle-40/) 

I made use of [11ty Rocks!](https://11ty.rocks/) and the [official starter project](https://github.com/11ty/eleventy-base-blog)

This is a work in progress site, so I will be continuing to implement more features and have better design over time as I learn more about layouts and css. I am particulally interested in implementing some ideas in this[ project](https://github.com/madrilene/eleventy-excellent) 



``` directory


```


## Access to the internet with Cloudflare



# Containers and Docker

# Thoughts on building something with AI

