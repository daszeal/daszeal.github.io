---
layout: project
title: Perfecting the Powered Landing
date: 2026-01-27
status: active
---

Developing a simple yet effective solution to performing the suicide burn (termed *hoverslam* by SpaceX).
Plain English: Finding how to land falling things using rocket engines, [example here](https://www.youtube.com/watch?v=ZCBE8ocOkAQ).

### Goals
- Requires minimal data input from on-board sensors;
- Effectively cuts all velocity to zero once on the landing site;
- Computationally simple, enabling quick correction adjustments;
- Enabling development of flight computers for more spacecraft capable of powered landing, on Earth or on other celestial bodies.

### Timeline
- **Jan. 2026** - Initiated project, ran simple derivations assuming minimal horizontal velocity.
- **Feb. 2026** - Improved on given limitations, including correcting to include horizontal momentum (calculated via flight path angle).

### Outputs
- 1 draft paper in Overleaf
- 2 posts on this website
- 2 KSP simulations (repeated across 10+ quicksaves) in vacuum conditions with success rates improving over time
- Multiple KSP atmospheric booster landing attempts (no calculations applied)

### Links
- [**Post** - A Kinematic Analysis of Throttle-controlled Powered Landings](https://daszeal.github.io/2026/02/06/A-Kinematic-Analysis-of-Throttle-controlled-Powered-Landings/)
- [**Post** - Adding Instantaneous Flight Path Angle to the Calculation](https://daszeal.github.io/2026/02/08/Adding-Instantaneous-Flight-Path-Angle-to-the-Calculation/)
- [**Photo** - Simulation of atmospheric descent for large vehicles](https://daszeal.github.io/pics/booster-landing-burn/)

### Future Plans
- Include mass changes during the landing burn;
- Address atmospheric drag for landings involving atmospheric reentry and terminal velocity;
- Create a simple, computationally cheap program for flight computers to repeatedly run during descent, executing corrective adjustments mid-flight.
