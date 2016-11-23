---
layout: post
title:  "A 10 Watt Bluetooth Guitar Amp Hack"
banner_image: amp/Amp.jpg
tags: [hardware, bluetooth, audio, hack]
---

It's been pretty quiet in the lab this summer, and playing around with an audio project has always seemed like a lot of fun, though, until now I've been a little too intimidated to try it out.  My AM/FM radio just gave up the ghost, so *perfect*, I thought.  Now would be a great time to shake things up and modernize the lab with a custom bluetooty speaker system on the cheap.

<!--more-->

Some design goals:
1. A self-contained amplifier/speaker system, that'd be easy to hack.
1. A stylish enclosure to snazz up the lab.
1. An off the shelf bluetooth adapter that I can integrate into the enclosure and the amplifier, and one that's easy to supply power to.
1. Something in the 10-20 watt range.

# Prototyping and Failure

The first thing that I thought about trying was to take an old boombox or AM/FM radio, and hacking in an off-the-shelf bluetooth audio adapter either into an available AUX input channel, or somehow hijacking another available audio channel (like the one used for the tape input).  After a few tries scrounging around, I wasn't able to find a boombox or radio that met all of my needs.  Either they were too complicated internally (they didn't have easily accessible audio channel lines for AUX, or tape), or they just didn't have the right form factor.  But eventually, after a bit of digging, what I did find, was a 10-15 watt Peavey Solo guitar & microphone amplifier.  Alright!

{% include image_full.html imageurl="/images/posts/amp/Peavey.jpg" title="Peavey Solo" caption="Peavey Solo Amplifier in need of some love" %}

It had a broken potentiometer for the aux volume control that was rattling around inside of the enclosure.  But that'd be an easy fix with a through-hole 50K pot soldered back on to the main board, and off to the races we go!

{% include image_full.html imageurl="/images/posts/amp/Broken-pot.jpg" title="Poor guy" caption="Poor guy" %}

Unfortunately, after plugging it in, and listening to the audio quality, the mood got a little deflated.  Although it was loud, with 15 watts, and a 4Ω woofer, the fidelity was pretty poor, and I think that it is due to the amplifier's board layout, cost-reducing efforts, and the low quality of the speaker driver.  The amplifier also had a pretty solid 60hz buzz, which at the time, I didn't really know how to solve.  Turns out, [appropriate grounding](http://www.geofex.com/article_folders/stargnd/stargnd.htm) and employment of [bypass capacitors](https://www.youtube.com/watch?v=UW_XFGGTh0I) (to reduce noise on the power rails) are incredibly important to producing a clean amplified audio signal.

I had a second problem too.  I wanted to have the bluetooth adapter's power supplied by the amplifier board.  After hacking the two together to test things out, I could hear really *awful* RF interference emitting from the amplifier.  The reason for this had to do with the grounding technique of the amplifiers board layout.  It definitely wasn't in a star pattern, and it looked like power and signal grounds were intermixed, which I've read can lead to problems. The amplifier chips on the board also lacked proper bypassing, presumably to reduce the COGS and manufacturing costs of the product.

{% include image_full.html imageurl="/images/posts/amp/Stock-amp.jpg" title="Stock amplifier" caption="One half of the stock amplifier circuit; Comprised of two TI RC4558P chips, presumably in a bridge configuration<sup>1</sup>" %}

I played around with adding some bypassing to the amplifier chips, but ultimately, trying to fix the problems started to seem less and less feasible for me to do in a reasonable amount of time.

{% include image_full.html imageurl="/images/posts/amp/Stock-amp-bypassing.jpg" title="Trying to add bypass caps" caption="Hacked in some bypass caps on the amplifier chips" %}

Well, that didn't work.  So, short story long, let's roll our own!

# New goals

Going back to the drawing board a little bit, I picked these as my new goals:

1. Build a self-contained mono amplifier/speaker system that will fit into the old Peavey guitar amp enclosure.
1. A circuit that's easy enough for me to understand.
1. Provides 10-20 watts through a 4Ω load (so that I can re-use the speaker)
1. A simple, yet snazzy chassis and face plate that fits into the cavity left by the stock Peavey chassis, and one which provides heat sinking for the amplifier chip.
1. An integrated 115V AC power supply.

# Bluetooth

This off-the-shelf bluetooth adapter is from XINGDONGCHI, and is great for this project for three reasons:

{% include image_full.html imageurl="/images/posts/amp/Bluetooth-before.jpg" title="Bluetooth adapter before" caption="XINGDONGCHI USB bluetooth Aadapter" %}

1. It's cheap (< $9 shipped).
1. The presence of the USB port means that it's powered by 5v.
1. The presence of a 3.5mm headphone jack means that the audio is easy to intercept.

This device isn't actually a USB audio adapter.  It provides audio through a 3.5mm headphone jack, and only uses the USB connector for 5v power.  It's pretty ideal for integrating into an amplifier project.

To prepare the adapter for integration, first remove the plastic enclosure by placing it in a vice, along its seam, and gently applying compression until the two halves pop apart.  Bingo.  Then, to provide a more permanent integration point, depopulate the USB male connector, and solder on a 4x1 male pin header.  That will provide power and grounds to the two outer pins, leaving the two inner pins unused.

{% include image_full.html imageurl="/images/posts/amp/Bluetooth-after.jpg" title="Bluetooth adapter after" caption="Bluetooth adapter after depopulating the USB connector, and adding a male pin header, and white wire to the indicator LED" %}

This particular adapter has an indicator LED, which blinks at different patterns according to whether or not something is paired to it.  I chose to depopulate the LED as well, and run its signal (which is connected directly to the SoC via a 1K resistor), out to one of the unused pins of the male pin header.  My goal for that is to incorporate the blinking pattern into the front panel of the amplifier somehow.

{% include image_full.html imageurl="/images/posts/amp/Bluetooth-after-2.jpg" title="Bluetooth adapter after" caption="Bluetooth adapter after depopulating the USB connector, and adding a male pin headers" %}

Now, since this project is going to be a mono amplifier (there's only one speaker), you might think that you could forgo the 3.5mm audio jack and somehow route a mono signal through the second unused pin of the male header.  But that would mean that the signal and the power source for the board would directly share a common ground pin.  Now, that *may* work, but to do our due "grounding" diligence, I decided to keep the 3.5mm jack, so that we would have a separate ground for the signal, and for the power source of the adapter.

# Get down to business

Okay, so building an amplifier...  The great thing is that there is no shortage of in-depth, detailed information out there on how to build DIY audio equipment.  Unsurprisingly, that also turns out to be a downside as well.  Thankfully, there's is a great article in MAKE that details pretty much exactly what I want to do:

[![Skeleton Amplifier Guide](/images/posts/amp/Skeleton-amp.jpg)](http://makezine.com/projects/build-bare-bones-skeleton-amplifier/)

They call it the "Skeleton amplifier", and it's based on the [LM1875](http://www.ti.com/lit/ds/symlink/lm1875.pdf) chip, which has gained notoriety for its ease of use, and its quality audio reproduction.  The project also provides a circuit diagram for a power supply, and parts list, configuring two LM1875s as an 11 watt per channel stereo amplifier.  Best of all, I only have to build 1/2 of the amplifier circuit, since I only need mono!  Yes!

# Parts

Here's the parts list for the mono amplifier.  These are mostly taken from the Skeleton Amplifier guide, and I was able to source almost everything from Mouser (as opposed to radioshack) reducing the cost somewhat.  I include a couple additional components for the purpose of integrating the bluetooth adapter.  If you can, try to salvage as many of the components as you can.  I was able to salvage capacitors and other various things from other derelict amplifiers that I happened to have in the junk pile.  In particular, from a fancy, yet busted amplifier that I found in a junk pile, I pulled two enormous 7500μF 80V caps that I then used for the power supply, and a large aluminum heatsink which I used to dissipate the heat form the LM1875.  Below, I list the part numbers, where available, but you should feel free to find any part that meets the specs described below.

If you don't have a ready supply of capacitors and resistors, getting a pre-assembled kit from ebay or amazon that contains a wide variety of electrolytic, ceramic, and film capacitors is a great way to go.  Resistor kits are also available, and relatively inexpensive.  If you do buy from mouser, buy more than you need, in quantities of 10 to reduce the per-unit cost, and having them around is really handy.

**Note: the parts list below is for a MONO amplifier**

#### Capacitors
1. 2x - 4700μF to 7500μF (35-80V) electrolytic capacitors (ECA-1EHG472)
1. 2x - 100μF 25V electrolytic capacitors
1. 1x - 22μF 25V electrolytic capacitor (ECE-A1EN220X)
1. 2x - 1μF 25V film capacitor (ECQ-E2105KF)
1. 3x - 0.1μF 25V film capacitors (ECQ-E4104KF)
1. 1x - 0.22μF 25V film capacitor (ECQ-E2224KF)
1. 1x - 0.33μF 25V film capacitor

#### Resistors
1. 1x - 1Ω 1W metal film resistor (CPF11R0000FKEE6)
1. 1x - 10KΩ linear taper, through-hole potentiometer, 16mm shaft, don't skimp (P160KNP-0QC15B10K)
1. 2x - 10KΩ any type resistors
1. 2x - 22KΩ any type resistors
1. 1x - 220KΩ any type resistor
1. 1x - 1KΩ any type resistor

#### Power
1. 1x - 25.2V out (115V in) power transformer (Triad F-41X)
1. 4x - 40-60V 5A Schottkey Diodes (SB560-E3/54, 1N5822)
1. 1x - 120V rated SPDT panel mount toggle switch
1. 1x - 500mA 250V time lag fuse cartridge (0218.500MXP)
1. 1x - Inline fuse holder (go to Radioshack and see what they have that will fit a 5mmx20mm fuse)
1. 1x - 5V voltage regulator (L7805CV)

#### IC and Other
1. 1x - LM1875T
1. 1x - XINGDONGCHI USB Bluetooth audio adapter (or something that seems like it'd be easy to work with)
1. 1x (at least) - TO-220 thermal insulator, to electrically insulate the LM1875, but still allow it to thermally bond to the heat sink (43-77-20G)
1. 1x - 1x40 breakaway male pin header
1. 1x - A stylish knob for the volume potentiometer
1. 1x - LED (I chose a neat defuse white)
1. 1x - 2N706 NPN Transistor
1. 6x - 2 pole 5mm pitch screw down terminal blocks (optional, but nice.  Note: only 4 ended up in the picture below).
1. 2x - Perf/prototype boards

##### Chassis and heat dissipation
1. 1x - 2x4x10 7/8" (or whatever dimensions you need) architectural aluminum stock
1. 1x - Aluminum heatsink (optional, you can alternatively find a way to thermally bond the amplifier chip to an aluminum chassis).

{% include image_full_zoom.html imageurl="/images/posts/amp/Parts-amp.jpg" title="Amplifier parts" caption="Amplifier parts (most of them, anyway)" %}

{% include image_full_zoom.html imageurl="/images/posts/amp/Parts-power.jpg" title="Power supply parts" caption="Power supply parts (well, everything except the mounting hardware and terminal blocks)" %}

{% include image_full_zoom.html imageurl="/images/posts/amp/Parts-chassis.jpg" title="Chassis and mounting hardware" caption="Chassis and mounting hardware" %}

# References

1. [Bare-Bones "Skeleton" Amplifier](http://makezine.com/projects/build-bare-bones-skeleton-amplifier/) - http://makezine.com/projects/build-bare-bones-skeleton-amplifier/
1. [Bridge Amplifier Circuit](https://en.wikipedia.org/wiki/Bridged_and_paralleled_amplifiers#Bridged_amplifier) - https://en.wikipedia.org/wiki/Bridged_and_paralleled_amplifiers#Bridged_amplifier


