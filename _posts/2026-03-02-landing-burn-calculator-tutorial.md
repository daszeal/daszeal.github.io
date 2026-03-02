---
layout: post
title: Landing Burn Throttle Calculator Tutorial
description: How to use the calculator!
tags: [physics, rocketry, tutorials]
---
<p>Current Model: v1.2</p>

### Disclaimer
I disclaim all responsibility for any adverse/catastrophic consequences caused by the landing of any vehicle, real or fake, that had used any part of this program during its flight. If used, the user assumes all responsibility, so use at your own risk, especially in the real world.

### Assumptions (READ BEFORE !!!)
We will assume you have enough fuel to land. A good rule of thumb is that if you’re traveling faster than the amount of $$\Delta v$$ you have left, you’re gonna [lithobreak](https://en.wikipedia.org/wiki/Lithobraking) at some point;
You will throttle landing engines at that specific throttle immediately after measurement and subsequent calculation of throttle. We assume all three events (measurement, calculation, and execution) are close enough that the time between them is negligible;
You have a 0º angle-of-attack (This means your engines are pointed directly in the direction of travel. This does NOT mean you’re nose diving, engines up).

### Step 1 - Select mode
Vacuum mode ignores drag and assumes there’s no atmosphere. Kerbin and Earth modes are different since they have different atmospheres: make sure you choose the correct one. The Earth mode is built for Earth, not the planet in Kerbal Space Program’s RSS/RO.

### Step 2 - Pre-launch

Determine these things beforehand and plug them in. 

- **Maximum thrust** - the total thrust of the engine(s) you’re using for landing. This may or may not be all your engines. If you’re testing in the real world, make sure you can reignite those engines after MECO;
- **Specific impulse** - the sea level $$I_{sp}$$ of the engine(s) you’re planning on using for landing;
- **Dry mass** - mass of the rocket when all the tanks are empty;
- **Diameter** - of the rocket, used for aerodynamic calculation;
- **Coefficient of drag** - for most rockets that should be around 0.8-1.2 depending on how ugly your rocket is. Less aerodynamic rockets have higher $$C_d$$ s. The default is 1.0. If you’re using this for a real rocket, I highly recommend finding out the exact value in a wind tunnel or using computational fluid dynamics;
- **Gravity** - of the celestial body you’re landing on. This defaults to 9.8.

If you selected vacuum mode, the diameter and $$C_d$$ are not required.

### Step 3 - At the moment of engine reignition

If this is KSP, pause the game with all the displays open. 

If this is the real world, find a software engineer that can configure the flight computer to take all these values. 

Measure these values:
- **Altitude** - to make it as accurate as possible, make sure it’s the exact distance between the landing zone and the base of your rocket;
- **Velocity** - make sure the value is *at that moment*;
- **Mass** - including all the remaining propellant on board. 

Then, press the calculate button to figure out the required constant throttle to land.

### Step 4 - Understanding the outputs

This should be straightforward.

- **Throttle** - the value you should throttle your current engine to;
- **KSP Scale** - this is how many little units you should cover in the KSP navball throttle display. Notice how there are 15 “units” divided into sections of 3;
- **Burn time** - self explanatory. A burn time longer than the KSP display is ok, this refers to the burn time when throttled down;
- **Warnings** - this tells you if something needs immediate attention. If the throttle value is below 40%, it will tell you that this is below what most real-life engines can throttle to. You can, of course, ignore this if you’re playing KSP. A critical warning means that you’re about to crash and there's nothing you can do about it.
