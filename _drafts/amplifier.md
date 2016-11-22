---
layout: post
title:  "A 10 Watt Bluetooth Guitar Amp Hack"
banner_image: amp/Amp.jpg
tags: [hardware, bluetooth, audio, hack]
---

It's been pretty quiet in the lab this summer, and playing around with an audio project has always seemed like a lot of fun, though I've been a little too intimidated to try it out.  My AM/FM radio just gave up the ghost, so "perfect", I thought--now would be a great time to shake things up and modernize the lab with a custom bluetooth speaker system on the cheap.

<!--more-->

Some design goals:
1. A self-contained amplifier/speaker system, that'd be easy for me to hack
1. A stylish enclosure to snazz up the lab
1. An off the shelf bluetooth adapter that I could integrate into the enclosure and the amplifier, and one that I could easily supply power to.

The first thing that I thought about trying was to take an old boombox or AM/FM radio, and hacking in an off-the-shelf bluetooth audio adapter either into an available AUX input channel, or somehow hijacking another available audio channel (like the one used for the tape input).  After a few tries scrounging around, I wasn't able to find a boombox or radio that met all of my needs.  Either they were too complicated internally (they didn't have easily accessible audio channel lines for AUX, or tape), or they just didn't have the right form factor.  But eventually, after a bit of digging, what I did find, was a 10-15 watt Peavey Solo guitar & microphone amplifier.  Alright!

{% include image_full.html imageurl="/images/posts/amp/Peavey.jpg" title="Peavey Solo" caption="Peavey Solo Amplifier in need of some love" %}

It had a broken potentiometer for the aux volume control, that was rattling around inside of the enclosure.  But that'd be an easy fix with a through-hole 50K pot soldered back on to the main board, and off to the races we go!

{% include image_full.html imageurl="/images/posts/amp/Broken-pot.jpg" title="Sad Pot" caption="Sad pot" %}

Unfortunately, after plugging it in, and listening to the audio quality, the mood got a little deflated.  Although it was loud, with 15 watts, and a 4Ω woofer, the fidelity was pretty poor, probably due to the amplifier's board layout, cost-reducing efforts, and the low quality of the speaker driver.  The amplifier also had a pretty solid 60hz buzz, which at the time, I didn't really know how to solve.  Turns out, [appropriate grounding (star grounding)](http://www.geofex.com/article_folders/stargnd/stargnd.htm) and judicious use of [bypass capacitors](https://www.youtube.com/watch?v=UW_XFGGTh0I) (to reduce noise on the power rails) is incredibly important to producing a clean amplified audio signal.

I had a second problem too.  I wanted to have the bluetooth adapter's power supplied by the amplifier board.  After hacking the two together to test things out, I could hear *really* awful RF interference emitting from the amplifier.  The reason for this had to do with the grounding technique of the amplifiers board layout.  It definitely wasn't in a star pattern, and it looked like power and signal grounds were intermixed, which I've read can lead to problems. The amplifier chips on the board also lacked proper bypassing, presumably to reduce the COGS and manufacturing costs of the product.

{% include image_full.html imageurl="/images/posts/amp/Stock-amp.jpg" title="Stock amplifier" caption="One half of the stock amplifier circuit; Comprised of two TI RC4558P chips, presumably in a bridge configuration<sup>1</sup>" %}

I played around with adding some bypassing to the amplifier chips, but ultimately, trying to fix the problems started to seem less and less feasible for me to do in a reasonable amount of time.

{% include image_full.html imageurl="/images/posts/amp/Stock-amp-bypassing.jpg" title="Trying to add bypass caps" caption="Hacked in some bypass caps on the amplifier chips" %}

Well, that didn't work.  So, short story long, let's roll our own!

# References

1. [Bridge Amplifier Circuit](https://en.wikipedia.org/wiki/Bridged_and_paralleled_amplifiers#Bridged_amplifier) - https://en.wikipedia.org/wiki/Bridged_and_paralleled_amplifiers#Bridged_amplifier


