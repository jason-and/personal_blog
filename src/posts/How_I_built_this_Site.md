---
title: How I built this Site
date: 2024-02-14
tags:
  - blogging
  - raspberrypi
  - networking
  - selfhosting
status: published
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

I made use of [11ty Rocks!](https://11ty.rocks/) and the [official starter project](https://github.com/11ty/eleventy-base-blog) to get started. 

An 11ty project requires a configuration file, this gives instructions to 11ty and tells it how to behave and treat different folders and content in your directory. 

The idea is that you have a directory (mine is called src or source), that represents the input to 11ty. It may contain folders with content, posts, images, layouts, and templates. I am using the Nunjucks template language as it seemed the most versatile of the format languages allowed by 11ty. 

This source directory, when 11ty is ran, is used by the generator along with our config file to create html files organized into a new folder called "Site". This is now ready to be put online. 

# Getting Online

So we have a folder with some html but we need to get that onto the internet. The first thing to do is get it onto our Raspberry pi as that will be plugged into my router and always on ready to serve to the html to the internet. This is easy as I push my site onto GitHub and am able to pull the repo from github onto the pi. 

But just because its available on different hardware, we still need to get it online. I used nginx as it is more lightweight than apache, and explicitly talked about static site serving. The configuration came from a docker container and some tweaks from documentation and ai assistant. I am still trying to understand all of the options available to me using nginx admittedly and will say more as I understand. As far as I can tell, it is working to securely serve the site. 

## Access to the internet with Cloudflare

I only knew about VPN's for personal use on your phone, hiding your browsing from your ISP, I did not fully understand how they can be implemented across a variety of settings, until putting this site together. I used Cloudflare to create what they call a tunnel (a vpn) between my site.  and the rest of the internet. This keeps traffic away from ports on my home router. There are other benefits that I am still digesting (networking is new to me!). It was free and straightforward, I configured a tunnel on their website, and then installed their software (cloudflared) on the pi so that it could use their tunnel. Cloudflare gave me a token for my tunnel, I associated it with the pi and we were up an running. 

## All is in place, let's put it all together

Another new workflow for me is thinking about containerization, using software like Docker. Docker creates a separate place on your machine for some application or service you are running. This means that if you download some software that is used in your application, it is not going to mess with or interfere with other programs on your machine. Basically a quarantine for your application. This helps keep your application portable and reproducible.

I wanted to try this, so with some documentation and some LLM assistance, I was able to get a Dockerfile going. This file can be thought of as a script with a set of instructions on all of the software that makes your application run. It specifies version numbers, settings, dependencies, everything. When it runs, it downloads all of the tools you need and runs all the programs with the right settings.

All that was left was to put a bash script together to push to the web

My script:
- downloads latest changes from github
- runs docker container
	- downloads below software
		- Node.js (for 11ty)
		- 11ty
		- nginx
		- cloudflared
	- runs 11ty generating the HTML
	- activates nginx which serves the content to the internet through the cloudflare tunnel

The result is html on the internet served securely without putting my network at risk. 

# Still a WIP

This is a work in progress site, so I will be continuing to implement more features and have better design over time as I learn more about layouts and css. I am particulally interested in implementing some ideas in this[ project](https://github.com/madrilene/eleventy-excellent).  [This article](https://alistapart.com/article/responsive-web-design/) about Responsive Web Design is my current inspiration. 

I'm new to web design and am mostly exploring as a hobby, so I only want it to be functional and look decent, once those goals are met, I will focus more on some data analysis projects. 

It was fun to learn more about the guts of the internet and build an appreciation for the infrastructure that makes it all run. Putting a site together in this fashion is much more work, but also really rewarding. Despite no plans to become a web designer I feel much better for it and am excited to keep building more skills. 

