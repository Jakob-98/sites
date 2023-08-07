---
title: "[IMPORTED] What defines great software: solving my problem in under 5 minutes with Tailscale"
date: "2022-05-04"
path: /tailscale-great-software
template: "post"
draft: false
slug: "solving-problem-5-minutes"
category: "Dev"
tags:
  - "Homeserver"
description: "I had been avoiding properly setting up remote networking to my homeserver. Tailscale solved my problem in under 5 minutes."
socialImage: "/media/history.png"
---

*TL;DR:* I had been avoiding properly setting up remote networking to my homeserver. Tailscale solved my problem in under 5 minutes.

Today, at 4:30pm, I decided I had enough with working on my research project and started scrolling through the top posts on hacker news. One clickbaity post attracted my attention: "Tailscale raises $100M… to fix the Internet"- the lure worked as I promptly found myself scanning through the article. In the back of my mind I had been pondering for a while whether it was possible to just use my favourite identity provider in order to pseudo-securely log into my homeserver. Tailscale claimed to be able to do it among a plethora of other features.

Why did I need this? Roughly two weeks ago I set up ubuntu server on a Dell optiplex 3060 micro alongside two 10TB HDD's. A crude attempt at a NAS for a relative new-age techhy like myself. I needed to set up port-forwarding for my homeserver, as I do not have direct access to my routers credentials- they are located in the apartment of the tenant living below me. In other words, I was lazily avoiding asking my downstairs neighbour to send me the admin user and password of the router.

Being intrigued at the promises of Tailscale, at 4.31pm I found myself clicking on [use tailscale]. After ssh'ing in my homeserver and running ```bash curl -fsSL https://tailscale.com/install.sh | sh```, following a link from stdout prompted me to login using my identity provider of choice. Similarly, roughly a minute or so later, on my laptop I installed Tailscale and logged in. Clicking on 'homeserver' in the TailScale menu item copied the IPv4 address to my clipboard and ta-da, at 4.35pm, I was able to connect to my homeserver qbittorrent webviewer with the newly generated IP address.

My problem wasn't really a problem, but rather a mild inconvenience. Nevertheless, solving my issue in under 5 minutes convinces of the user-friendlyness of a piece of software. Chapeau, TailScale.

![history](/media/history.png)

