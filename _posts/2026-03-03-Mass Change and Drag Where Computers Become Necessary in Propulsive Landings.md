---
layout: post
title: Mass Change and Drag - Where Computers Become Necessary in Propulsive Landings
description: How I built my new landing calculator
tags: [physics, rocketry, coding]
---

So I recently programmed a [small calculator](https://daszeal.github.io/tools/landing-burn-calculator/) with my throttle equation derived from [this post](https://daszeal.github.io/2026/02/06/A-Kinematic-Analysis-of-Throttle-controlled-Powered-Landings/), laying out the original theory that powered landings require throttle control, and [this post](https://daszeal.github.io/2026/02/08/Adding-Instantaneous-Flight-Path-Angle-to-the-Calculation/), addressing the additional distance flown during the landing due to flight path angle. This was created since repeatedly typing numbers into Desmos when playing KSP is inefficient and impractical. 

### Testing the old formula

I completed testing in Kerbal Space Program: first of which were vacuum tests on the Mun, yielding nominal results with the only limiting factor being how accurate my fingers can control the throttle. Corrections were needed to adjust for mass change, but only a few were actually required.

<div class="figure">
  <img src="/assets/photos/LBVacSim1.png" class="post-image">
</div>

For atmospheric testing, I was too lazy for a Falcon 9-style XL-diameter rocket with boostbacks, so I just strapped together a suborbital single-stage rocket resembling the New Shepard and decided to test with that. This also eliminates the need to input values for flight path angle.

<div class="figure">
  <img src="/assets/images/KSPStarhopper.png" class="post-image">
</div>

Test results were below nominal; the calculator would have a degree of error way above that shown on the Mun, with almost all tests resulting in over-throttle and re-ascent, even when multiple corrections were used. 

I attributed this error to the second limitation discussed in my [first model](https://daszeal.github.io/2026/02/06/A-Kinematic-Analysis-of-Throttle-controlled-Powered-Landings/): atmospheric drag and mass change. This led me to find ways to further improve the calculator by including mass changes and drag, outlined below.

### Addressing mass change

Calculating mass change is relatively simple. The mass flow rate ($$\dot{m}$$) for rocket engines is given by this equation:

$$
\dot{m} = \frac{T}{v_{exhaust}} = \frac{T}{I_{sp} g_0} 
$$

Problem is, by definition of *rate*, this only gives me how much fuel is flowing out per *second*. so I could only determine the total mass change if I figured out the total burn time. 

Now, I have purposely avoided time because including time in the calculation makes things insanely complicated, and once that’s thrown in, I need to find out the thrust needed for *that*, replug it in, find out the new mass change, repeat, and do a lot of math that would make me go crazy.

This is where computers come in! To actually simulate the whole thing, I can use Python to simulate it. By declaring the instantaneous mass as the starting mass minus $$\dot{m}$$ times the elapsed simulation time, I can get it to repeatedly simulate different throttles to find out the best one.

### Addressing drag

The effect drag has on the descent is easy to understand: drag is a force, which, when divided by the vehicle’s mass, gives acceleration. Problem is, drag is determined from velocity, air density ($$\rho$$), and the coefficient of drag ($$C_d$$):

$$
D = \frac{1}{2} \rho C_d v^2
$$

where

- $$v$$ is decreasing as the landing burn continues;
- $$\rho$$ increases as we hit lower parts of the atmosphere, and by a lot. If we start the landing burn at 8km we’re basically at Mount Everest levels of air density;
- $$C_d$$ is just hard to work with. Most rocket-shaped objects with their engines pointing down have a Cd of 0.8-1.2, but that spikes when the vehicle goes from supersonic to transonic [1][2]. This is very bad since most Falcon 9 landings happen around that band. And you can’t “calculate” it either: you can guess or you can use a wind tunnel/computational fluid dynamics.

Using the same method with mass change, we can use Python to figure out the $$\rho$$ at each specific height, calculate the acceleration in that moment, and repeat. Specifics are outlined below.

### Simulation model

The code first simulates the atmospheric parameters based on the mode chosen by the user: vacuum mode returns no atmosphere, while Earth and Kerbin modes return their respective equations that find the air density ($$\rho$$) from inputting different altitudes.

$$
\rho = \rho_{sea level} e^{\frac{-h}{H}}
$$

where $$h$$ is the current altitude above sea level, the input, and $$H$$ is the *scale height*, or a height where the entire equation works out when put to the power of $$e$$. This value is around 8.5 km for Earth and 5km for Kerbin [3].

The simulator code is programmed to simulate the scenarios based on the current altitude, mass, and velocity of the vehicle, also keeping track of the time that’s passed ($$t_0$$ is the starting point of the burn) and the total drag accumulated. After taking drag into account in the acceleration calculation,

$$
a_{net} = \frac{T + D}{m_{instant}} - g
$$

It will output the total change in altitude, velocity, and mass. Every 20 milliseconds, it recalculates everything based on the current scenario until the vehicle reaches an altitude of zero.

The calculator performs binary searches by testing different throttles multiple times using the simulation declared above. Once it’s done, it will return the best throttle value it found (where the final velocity is zero when the altitude is zero), along with its burn time, final mass, average drag force across the whole simulation, and any warnings that may be present for throttles with low values or are above 100%. 

The warning system also addresses the first limitation outlined in [my first post](https://daszeal.github.io/2026/02/06/A-Kinematic-Analysis-of-Throttle-controlled-Powered-Landings/) on this project, creating a way for real liquid-fueled engines to use this.

Flight path angle and the transonic drag spike are ignored due to the exponential increase in calculator complexity. For flight path angle, just eyeball it, it’ll be fine 😅

### Conclusion and limitations

As mentioned before, the remaining limitations include

- How flight path angle changes landing burn distance;
- Transonic drag spike for atmospheric reentry;

along with

- Engine thrust changes as altitude decreases.

However, most of these limitations can either be eyeballed or do not have any meaningful effect on the final throttle. If the need arises to address these limitations, I will do so in the next post and version of the calculator. 

The beta version of [v1.2](https://daszeal.github.io/tools/landing-burn-calculator-beta/) should come out when this gets posted, along with a [tutorial](https://daszeal.github.io/2026/03/02/landing-burn-calculator-tutorial/) for using it if it comes across any lost KSP players. Tests were completed with the suborbital rocket, yielding above-nominal results, including the first-ever fully constant-thrust, no-human-input soft-landing. Tests will continue until proven effective in vacuum conditions, then it will be updated to the official version.

### References

[1]J. G. Leishman, “Rockets & Launch Vehicle Performance,” eaglepubs.erau.edu, Jan. 2023, Available: https://eaglepubs.erau.edu/introductiontoaerospaceflightvehicles/chapter/rocket-performance/

[2]“Reddit,” Reddit.com, 2024. https://www.reddit.com/r/SpaceXLounge/comments/7xl5yp/drag_coefficient_of_falcon_9_1st_stage_in_landing/.

[3]J. Attema and D. van der Heijden, “Kerbin | Planets | Kerbal Space Program,” Github.io, 2026. https://avans.github.io/Webdictaat/showcase/ksp/planets/kerbin.html.
