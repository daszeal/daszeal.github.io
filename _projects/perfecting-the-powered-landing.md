---
layout: project
title: Perfecting the Powered Landing
date: 2026-01-27
status: active
description: Developing a simple yet effective solution to performing the suicide burn.
---

Developing a simple yet effective solution to performing the suicide burn (termed *hoverslam* by SpaceX).

Plain English: Finding how to land falling things using rocket engines, [example here](https://www.youtube.com/watch?v=HZmcicruJmw).

### Goals
- Requires minimal data input from on-board sensors, where no predictions for altitude or velocity are necessary;
- Effectively cuts all velocity to zero once on the landing site by firing engines at a specific throttle given current circumstances;
- Computationally simple, enabling quick correction adjustments;
- Enabling development of flight computers for more spacecraft capable of powered landing, on Earth or on other celestial bodies.

### Timeline
- **Jan. 2026** - Initiated project, ran simple derivations assuming minimal horizontal velocity.
- **Feb. 2026** - Improved on given limitations, including correcting to include horizontal momentum (calculated via flight path angle).
- **Mar. 2026** - Completed a Python-based, JavaScript-integrated calculator for landing burns. v1.0 (unreleased) and v1.1 used a basic algebra-based formula, while the newer v1.2 performs simulations in the background.

### Outputs
- 1 draft paper in Overleaf
- 2 posts on this website
- 2 KSP simulations (repeated across 10+ quicksaves) in vacuum conditions with success rates improving over time
- Multiple KSP atmospheric booster landing attempts (no calculations applied)
- 3 completed Python calculators, with 2 released versions that use JavaScript
- 15+ atmospheric tests using both versions of the online calculator

### Links
- [**Post**](https://daszeal.github.io/2026/02/06/A-Kinematic-Analysis-of-Throttle-controlled-Powered-Landings/) - A Kinematic Analysis of Throttle-controlled Powered Landings
- [**Post**](https://daszeal.github.io/2026/02/08/Adding-Instantaneous-Flight-Path-Angle-to-the-Calculation/) - Adding Instantaneous Flight Path Angle to the Calculation
- [**Post**](https://daszeal.github.io/2026/03/03/Mass-Change-and-Drag-Where-Computers-Become-Necessary-in-Propulsive-Landings/) - Mass Change and Drag - Where Computers Become Necessary in Propulsive Landings
- [**Photo**](https://daszeal.github.io/pics/booster-landing-burn/) - Simulation of atmospheric descent for large vehicles
- [**Photo**](https://daszeal.github.io/pics/simulation-landing-gamma/) - Simulation of vacuum descent for a test probe
- [**Tool**](https://daszeal.github.io/tools/landing-burn-calculator/) - v1.1
- [**Tool**](https://daszeal.github.io/tools/landing-burn-calculator-beta/) - v1.2 (Beta)

### Future Plans
- Experiment with PID controllers 
